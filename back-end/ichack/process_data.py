''''
json format 

{"id":"26564",
"lastVisitTime":1706990935286.102,
"title":"chrome extension all visited pages - Google Search",
"typedCount":0,"url":"https://www.google.com/search?q=chrome+extension+all+visited+pages&rlz=1C1VDKB_en-GBGB1068GB1068&oq=chrome+extension+all+visited+pages&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMg0IAxAAGIYDGIAEGIoFMg0IBBAAGIYDGIAEGIoFMg0IBRAAGIYDGIAEGIoF0gEJMTAxNjRqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8",
"visitCount":5}

Assume list of dictionaries 
'''

import warnings
warnings.filterwarnings('ignore')

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

histories = [{
    "id": "26564",
    "lastVisitTime": 1706990935286.102,
    "title": "chrome extension all visited pages - Google Search",
    "typedCount": 0,
    "url": "https://www.google.com/search?q=chrome+extension+all+visited+pages&rlz=1C1VDKB_en-GBGB1068GB1068&oq=chrome+extension+all+visited+pages&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMg0IAxAAGIYDGIAEGIoFMg0IBBAAGIYDGIAEGIoFMg0IBRAAGIYDGIAEGIoF0gEJMTAxNjRqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8",
    "visitCount": 5
},
{
    "id": "26567",
    "lastVisitTime": 1706990929958.551,
    "title": "How can I get all of the visited urls visited in a chrome extension background page - Stack Overflow",
    "typedCount": 0,
    "url": "https://stackoverflow.com/questions/12905737/how-can-i-get-all-of-the-visited-urls-visited-in-a-chrome-extension-background-p",
    "visitCount": 1
},
{
    "id": "26566",
    "lastVisitTime": 1706990907811.378,
    "title": "Google Chrome Extension, Getting The User's Most Viewed Websites - Stack Overflow",
    "typedCount": 0,
    "url": "https://stackoverflow.com/questions/28017296/google-chrome-extension-getting-the-users-most-viewed-websites",
    "visitCount": 1
},
{
    "id": "26565",
    "lastVisitTime": 1706990900009.931,
    "title": "Chrome extension, how to track each visited page? - Stack Overflow",
    "typedCount": 0,
    "url": "https://stackoverflow.com/questions/73614836/chrome-extension-how-to-track-each-visited-page",
    "visitCount": 1
},
{
    "id": "26563",
    "lastVisitTime": 1706990883588.749,
    "title": "chrome.webrequest.oncompleted - Google Search",
    "typedCount": 0,
    "url": "https://www.google.com/search?q=chrome.webrequest.oncompleted&rlz=1C1VDKB_en-GBGB1068GB1068&oq=chrome+webr&gs_lcrp=EgZjaHJvbWUqDAgBECMYJxiABBiKBTIGCAAQRRg5MgwIARAjGCcYgAQYigUyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyDAgGEAAYFBiHAhiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDMwNTFqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8",
    "visitCount": 2
},
{
    "id": "26533",
    "lastVisitTime": 1706990878620.616,
    "title": "microsoft edge extension get history - Google Search",
    "typedCount": 0,
    "url": "https://www.google.com/search?q=microsoft+edge+extension+get+history&sca_esv=5c40852b81bce253&rlz=1C1VDKB_en-GBGB1068GB1068&sxsrf=ACQVn08v0PmNHI36NmUbHXpFBglkG_H-Zw%3A1706985645167&ei=rYi-ZdHqCcKehbIPwbiG4Aw&ved=0ahUKEwiR9ZCI6Y-EAxVCT0EAHUGcAcwQ4dUDCBA&uact=5&oq=microsoft+edge+extension+get+history&gs_lp=Egxnd3Mtd2l6LXNlcnAiJG1pY3Jvc29mdCBlZGdlIGV4dGVuc2lvbiBnZXQgaGlzdG9yeTIIECEYoAEYwwQyCBAhGKABGMMEMggQIRigARjDBDIIECEYoAEYwwRI3Q5Q1AdYrA5wAXgBkAEAmAGnAaABqQqqAQMwLjm4AQPIAQD4AQHCAgoQABhHGNYEGLAD4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp",
    "visitCount": 2
},
{
    "id": "26562",
    "lastVisitTime": 1706990774095.325,
    "title": "chrome run extension in incognito - Google Search",
    "typedCount": 0,
    "url": "https://www.google.com/search?q=chrome+run+extension+in+incognito&rlz=1C1VDKB_en-GBGB1068GB1068&oq=chrome+run+extension+&gs_lcrp=EgZjaHJvbWUqCAgBEAAYFhgeMgoIABBFGBYYHhg5MggIARAAGBYYHjIICAIQABgWGB4yCAgDEAAYFhgeMggIBBAAGBYYHjIICAUQABgWGB4yCAgGEAAYFhgeMggIBxAAGBYYHjIICAgQABgWGB4yCAgJEAAYFhge0gEINTcxMGowajmoAgCwAgA&sourceid=chrome&ie=UTF-8",
    "visitCount": 2
},
{
    "id": "26561",
    "lastVisitTime": 1706990729455.817,
    "title": "test - Google Search",
    "typedCount": 0,
    "url": "https://www.google.com/search?q=test&rlz=1C1VDKB_en-GBGB1068GB1068&oq=test&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIMCAEQIxgnGIAEGIoFMgwIAhAAGEMYgAQYigUyEAgDEC4YxwEYsQMY0QMYgAQyDwgEEAAYQxixAxiABBiKBTIKCAUQABixAxiABDIGCAYQRRhBMgYIBxBFGDzSAQczMzhqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8",
    "visitCount": 2
},
{
    "id": "26560",
    "lastVisitTime": 1706990702922.93,
    "title": "50 Cent  - Google Search",
    "typedCount": 0,
    "url": "https://www.google.com/search?q=test&rlz=1C1VDKB_en-GBGB1068GB1068&oq=test&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMgwIARAjGCcYgAQYigUyDAgCEAAYQxiABBiKBTISCAMQABhDGIMBGLEDGIAEGIoFMhAIBBAuGMcBGLEDGNEDGIAEMgoIBRAAGLEDGIAEMgYIBhBFGEEyBggHEEUYPNIBBzM1OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8",
    "visitCount": 2
},
{"id":"17161", "lastVisitTime":1706990224397.52,"title":"GitHub: Let’s build from here · GitHub","typedCount":2,"url":"https://github.com/","visitCount":9},
{"id":"26555","lastVisitTime":1706987201804.042,"title":"Stories • Instagram","typedCount":0,"url":"https://www.instagram.com/stories/telegraph/3293959658052959225/","visitCount":1}

]



def extract_hour_from_timestamp(timestamp):
    """Converts timestamp to datetime and extracts the hour."""
    return datetime.fromtimestamp(timestamp / 1000.0, tz=timezone.utc).hour


def process_data(histories: list[dict]) -> dict[str, any]:
    df = pd.DataFrame(histories)
    df["id"] = df["id"].astype(int)
    # print(top_visited_n(5, df))
    # print(top_search_terms_n(5, df))
    # print(most_searched_people(5,df))

    outliers, typical = get_outlier_list(df)

    return {
        "top_visited_n": top_visited_n(5, df),
        "top_search_terms_n": top_search_terms_n(5, df),
        "incognito_search": incognito_search(df),
        "political_views": political_views(df),
        "most_searched_people": most_searched_people(5, df),
        "timings": generate_timings(histories),
        "outliers": outliers,
        "typical": typical
    }

# Extracts the domain name from the url
# e.g. https://www.google.com/search?q=test... -> www.google.com
def get_domain_from_url(url: str) -> str:
    return urlparse(url).netloc


def get_query_from_url(url) : 
    return urlparse(url).query

def top_visited_n(n, df) -> dict[str, int]: 
    filtered_df = df[~df['url'].str.contains('google|youtube', case=False)]
    temp_column = filtered_df["url"]
    apply_col = temp_column.apply(get_domain_from_url)
    filtered_df["url"] = apply_col
    return (
        filtered_df.groupby('url')['visitCount']
        .sum()
        .sort_values(ascending=False)
        .head(n)
    ).to_dict()

def generate_timings(histories):

    timings = defaultdict(lambda: defaultdict(int))

    # Group visits by hour
    for visit in histories:
        hour = extract_hour_from_timestamp(visit['lastVisitTime'])
        timings[hour][get_domain_from_url(visit["url"])] += visit["visitCount"]

    return {k: Counter(timings[k]).most_common(5) for k in timings}

    
# doesn't work yet 
def top_search_terms_n(n, df) : 
    # temp_column = df["url"]
    # apply_col = temp_column.apply(get_query_from_url)
    # df["url"] = apply_col
    return (df["title"].value_counts().sort_values(ascending=False).head(n)).to_dict() 
    
# Unsure if needed
def load_json_data(filename):
    # Construct the absolute path to the file
    script_dir = os.path.dirname(__file__)  # Absolute directory the script is in
    abs_file_path = os.path.join(script_dir, filename)
    
    # Load the JSON content into a Python list
    with open(abs_file_path, "r", encoding='utf-8') as file:  # Specify UTF-8 encoding
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

    for url in df['url']:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc.lower()
        # Check if the domain is in the naughty set
        if domain in naughty_set:
            incognito_count += 1

    return incognito_count

def find_outlier_string(strings):
    pass

def get_search_strings(histories):
    df = pd.DataFrame(histories)
    search_strings = []

    for url in df['url']:
        # Parse the URL
        parsed_url = urlparse(url)
        
        # Check if the domain is 'www.google.com' and the path contains '/search'
        if 'www.google.com' in parsed_url.netloc and '/search' in parsed_url.path:
            # Parse the query parameters
            query_params = parse_qs(parsed_url.query)
            
            # Extract the search query parameter 'q' if it exists
            if 'q' in query_params:
                search_query = query_params['q'][0]  # Take the first 'q' parameter
                search_strings.append(search_query)

    return search_strings

def get_embeddings(strings):
    API_KEY=requests.get("https://zeevox.net/90f45360e2dc8e1ac7e6338e5e06dab1").text.strip()
    client = OpenAI(
        api_key=API_KEY
    )  
    # Prepare the inputs for the embeddings call
    inputs = [string for string in strings]
    
    # Use the embeddings endpoint with the appropriate model
    response = client.embeddings.create(
        model="text-embedding-3-small",  # or another suitable model
        input=inputs
    )
    
    # Extract embeddings from the response
    # print(response['data'])
    embeddings = [item.embedding for item in response.data]
    return embeddings

from scipy.spatial.distance import cdist

def find_outlier_index(embeddings):
    print(len(embeddings))
    distances = []

    # Compute all pairwise distances at once
    all_distances = cdist(embeddings, embeddings, 'euclidean')
    
    # Calculate mean distance for each embedding
    for i, dists in enumerate(all_distances):
        mean_distance = mean([d for j, d in enumerate(dists) if j != i])
        distances.append(mean_distance)

    # Find the index of the max distance value
    outlier_index = distances.index(max(distances))
    return outlier_index

def find_outliers(embeddings, n=5):
    # First, identify and remove duplicate embeddings
    unique_embeddings, indices = np.unique(embeddings, return_index=True, axis=0)
    
    # Compute all pairwise distances at once, only for unique embeddings
    all_distances = cdist(unique_embeddings, unique_embeddings, 'euclidean')

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
    
    n = 5
    top_outliers, least_outliers = find_outliers(embeddings, n)
    top_n = [strings[i] for i in top_outliers]
    least_n = [strings[i] for i in least_outliers]

    return top_n, least_n

def political_views(df) :
    # searches of any polictically related topic and what exactly they have serched for
    pass


def get_search_title(title):
    return title.split("-")[0].strip()

def most_searched_people(n, df):
    temp_column = df["title"]
    apply_col = temp_column.apply(get_search_title)
    df["title"] = apply_col
    script_dir = os.path.dirname(__file__)
    os.chdir(script_dir)
    with open('famous_people.txt', 'r') as file:
        famous_people = [line.strip() for line in file]
    filtered_df = df[df["title"].isin(famous_people)]
    search_counts = filtered_df["title"].value_counts()
    sorted_search_counts = search_counts.sort_values(ascending=False)
    return sorted_search_counts.head(n).to_dict()

print(process_data(histories))