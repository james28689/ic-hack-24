import warnings

warnings.filterwarnings("ignore")

import pandas as pd
import numpy as np
from urllib.parse import urlparse, parse_qs
import os
import json
import requests
from datetime import datetime, timezone
from collections import defaultdict, Counter
from openai import OpenAI
from statistics import mean
from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans
from bs4 import BeautifulSoup
import re
from multiprocessing import Pool


def fetch_image_url(search_term):
    search_url = f"https://commons.wikimedia.org/w/index.php?search={search_term.replace(' ', '+')}&title=Special:MediaSearch&go=Go&type=image"
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, "html.parser")
    image_element = soup.find("img")

    if image_element:
        return re.sub(r"/\d+px", "/500px", image_element["src"])
    else:
        return None


def extract_hour_from_timestamp(timestamp):
    """Converts timestamp to datetime and extracts the hour."""
    return datetime.fromtimestamp(timestamp / 1000.0, tz=timezone.utc).hour


def process_data(histories: list[dict]) -> dict[str, any]:
    df = pd.DataFrame(histories)
    df["id"] = df["id"].astype(int)

    outliers, typical = get_cluster_data(df)

    return {
        "top_visited_n": top_visited_n(5, df),
        "top_search_terms_n": top_search_terms_n(10, df),
        "incognito_search": incognito_search(df),
        "most_searched_people": most_searched_people(5, df),
        "timings": generate_timings(histories),
        "outliers": outliers,
        "typical": typical,
    }


# Extracts the domain name from the url
# e.g. https://www.google.com/search?q=test... -> www.google.com
def get_domain_from_url(url: str) -> str:
    domain = urlparse(url).netloc
    # remove www. if it exists
    if domain.startswith("www."):
        domain = domain[4:]
    return domain


def get_query_from_url(url):
    return urlparse(url).query


def top_visited_n(n, df) -> dict[str, int]:
    filtered_df = df[~df["url"].str.contains("google|youtube", case=False)]
    temp_column = filtered_df["url"]
    apply_col = temp_column.apply(get_domain_from_url)
    filtered_df["url"] = apply_col
    return [
        {"website": key, "visits": value}
        for key, value in (
            filtered_df.groupby("url")["visitCount"]
            .sum()
            .sort_values(ascending=False)
            .head(n)
        )
        .to_dict()
        .items()
    ]


def generate_timings(histories):
    timings = defaultdict(lambda: defaultdict(int))

    # Group visits by hour
    for visit in histories:
        hour = extract_hour_from_timestamp(visit["lastVisitTime"])
        timings[hour][get_domain_from_url(visit["url"])] += visit["visitCount"]

    return {k: Counter(timings[k]).most_common(5) for k in timings}


def top_search_terms_n(n, df):
    return [
        {"term": key, "count": value}
        for key, value in (
            df["title"].value_counts().sort_values(ascending=False).head(n)
        )
        .to_dict()
        .items()
    ]


def load_json_data(filename):
    # Construct the absolute path to the file
    script_dir = os.path.dirname(__file__)  # Absolute directory the script is in
    abs_file_path = os.path.join(script_dir, filename)

    # Load the JSON content into a Python list
    with open(abs_file_path, "r", encoding="utf-8") as file:  # Specify UTF-8 encoding
        data = json.load(file)
    return data


def load_naughty_list(filename="naughty_list.txt"):
    script_dir = os.path.dirname(__file__)  # Absolute directory the script is in
    abs_file_path = os.path.join(script_dir, filename)
    abs_file_path = os.path.abspath(abs_file_path)  # Normalize path

    with open(abs_file_path, "r") as file:
        naughty_set = set(line.strip().lower() for line in file)
    return naughty_set


def incognito_search(histories):
    """Returns count of URLs that match the naughty list."""
    incognito_count = 0
    naughty_set = load_naughty_list()  # Load the list once and use it for all URLs

    df = pd.DataFrame(histories)

    for url in df["url"]:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc.lower()
        # Check if the domain is in the naughty set
        if domain in naughty_set:
            incognito_count += 1

    return incognito_count


def get_search_strings(histories):
    df = pd.DataFrame(histories)
    search_strings = []

    for url in df["url"]:
        # Parse the URL
        parsed_url = urlparse(url)

        # Check if the domain is 'www.google.com' and the path contains '/search'
        if "www.google.com" in parsed_url.netloc and "/search" in parsed_url.path:
            # Parse the query parameters
            query_params = parse_qs(parsed_url.query)

            # Extract the search query parameter 'q' if it exists
            if "q" in query_params:
                search_query = query_params["q"][0]  # Take the first 'q' parameter
                search_strings.append(search_query)

    return search_strings


API_KEY = requests.get(
    "https://zeevox.net/90f45360e2dc8e1ac7e6338e5e06dab1"
).text.strip()
client = OpenAI(api_key=API_KEY)


def get_embeddings(strings):
    # Prepare the inputs for the embeddings call
    inputs = [string for string in strings]

    # Use the embeddings endpoint with the appropriate model
    response = client.embeddings.create(
        model="text-embedding-3-small", input=inputs  # or another suitable model
    )

    # Extract embeddings from the response
    # print(response['data'])
    embeddings = [item.embedding for item in response.data]
    return embeddings


def find_outlier_index(embeddings):
    print(len(embeddings))
    distances = []

    # Compute all pairwise distances at once
    all_distances = cdist(embeddings, embeddings, "euclidean")

    # Calculate mean distance for each embedding
    for i, dists in enumerate(all_distances):
        mean_distance = mean([d for j, d in enumerate(dists) if j != i])
        distances.append(mean_distance)

    # Find the index of the max distance value
    outlier_index = distances.index(max(distances))
    return outlier_index


def find_outliers(embeddings, n=8):
    # First, identify and remove duplicate embeddings
    unique_embeddings, indices = np.unique(embeddings, return_index=True, axis=0)

    # Compute all pairwise distances at once, only for unique embeddings
    all_distances = cdist(unique_embeddings, unique_embeddings, "euclidean")

    # Calculate mean distance for each unique embedding
    mean_distances = np.mean(all_distances, axis=1)

    # Get the indices of the top n outliers among the unique embeddings
    unique_top_outliers_indices = np.argsort(-mean_distances)[:n]
    # Map back to the original indices
    top_outliers_indices = indices[unique_top_outliers_indices]

    # Get the indices of the least outlying searches among the unique embeddings
    unique_least_outliers_indices = np.argsort(mean_distances)[:n]
    # Map back to the original indices
    least_outliers_indices = indices[unique_least_outliers_indices]

    return top_outliers_indices, least_outliers_indices


def get_outlier_list(df):
    strings = get_search_strings(df)
    embeddings = get_embeddings(strings)

    n = 8
    top_outliers, least_outliers = find_outliers(embeddings, n)
    top_n = [strings[i] for i in top_outliers[:5]]
    least_n = [strings[i] for i in least_outliers]

    return top_n, least_n


def cluster_to_jamesobj(cluster: set[str]) -> dict[str, any]:
    return {
        "title": categorise(cluster),
        "count": len(cluster),
    }


def get_cluster_data(history: pd.DataFrame) -> tuple[list[str], list[str]]:
    search_strings = get_search_strings(history)
    clusters: list[set[str]] = cluster2(search_strings, get_embeddings(search_strings))

    # use multiprocessing to parallelilse the cluster to jamesobj conversion
    with Pool() as pool:
        cluster_jamesobjs = pool.map(cluster_to_jamesobj, clusters[-8:])

    return (list(set().union(*clusters[:5])), cluster_jamesobjs)


def get_search_title(title):
    return title.split("-")[0].strip()


def most_searched_people(n, df):
    temp_column = df["title"]
    apply_col = temp_column.apply(get_search_title)
    df["title"] = apply_col
    script_dir = os.path.dirname(__file__)
    os.chdir(script_dir)
    with open("famous_people.txt", "r") as file:
        famous_people = [line.strip() for line in file]
    filtered_df = df[df["title"].isin(famous_people)]
    search_counts = filtered_df["title"].value_counts()
    sorted_search_counts = search_counts.sort_values(ascending=False)
    return [
        {"name": k, "url": fetch_image_url(k)}
        for k in sorted_search_counts.head(n).to_dict().keys()
    ]


def ask_chatgpt(prompt: str, question: str) -> str:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": question},
        ],
        max_tokens=25,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return response.choices[0].message.content.strip('"')


def categorise(strings: set[str] | list[str]) -> str:
    categorisation_prompt = (
        """Give a title (<25 characters) to summarise the given strings."""
    )
    return ask_chatgpt(categorisation_prompt, "\n".join(strings))


def select_wacky(strings: set[str] | list[str]) -> str:
    wacky_prompt = """You are given several Google search queries. Reply with nothing but the most wacky or weird out of them."""
    return ask_chatgpt(wacky_prompt, "\n".join(strings))


def cluster2(strings: list[str], embeddings: list[list[float]]) -> list[set[str]]:
    # Convert embeddings list to a matrix (numpy array)
    matrix = np.array(embeddings)

    # Proceed with K-means clustering
    n_clusters = 100  # or however many clusters you think is appropriate

    kmeans = KMeans(n_clusters=n_clusters, init="k-means++", random_state=42)
    kmeans.fit(matrix)
    labels = kmeans.labels_

    # Create a DataFrame to store the strings and their cluster labels
    df = pd.DataFrame({"String": strings, "Cluster": labels})

    unique_strings = df.groupby("Cluster").nunique()
    unique_strings = unique_strings.sort_values(by="String", ascending=True)

    unique_clusters = []
    for cluster_label in unique_strings.index:
        cluster_strings = df[df["Cluster"] == cluster_label]["String"]
        unique_clusters.append(set(cluster_strings))

    return unique_clusters
