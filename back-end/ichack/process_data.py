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
from urllib.parse import urlparse
import os

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

def process_data(histories: list[dict]) -> dict[str, any]:
    df = pd.DataFrame(histories)
    df["id"] = df["id"].astype(int)
    # print(top_visited_n(5, df))
    # print(top_search_terms_n(5, df))
    # print(most_searched_people(5,df))
    return {
        "top_visited_n": top_visited_n(5, df),
        "top_search_terms_n": top_search_terms_n(5, df),
        "incognito_search": incognito_search(df),
        "no_incognito_oops": no_incognito_oops(df),
        "political_views": political_views(df),
        "most_searched_people": most_searched_people(5, df)
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
    
# doesn't work yet 
def top_search_terms_n(n, df) : 
    # temp_column = df["url"]
    # apply_col = temp_column.apply(get_query_from_url)
    # df["url"] = apply_col
    return (df["title"].value_counts().sort_values(ascending=False).head(n)).to_dict() 
    

def incognito_search(df) :
    # returns count of search word "incognito"

    incognito_count = 0

    # for url in df['url']:
    #     # determine if it's in the list

    # pass 

def should_use_incognito_count(df):
    pass

def no_incognito_oops(df) :
    # maybe return a list 
    pass 

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
    return sorted_search_counts.head(n)
    
process_data(histories)