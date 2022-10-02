# -*- coding: utf-8 -*
import json
import requests
import numpy as np
import random
from matplotlib import pyplot as plt
import csv
import texthero as hero
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

import pickle
import gzip

def get_data(api):
  response = requests.get(f"{api}", headers={"X-RapidAPI-Key": "caA3d7kx6x5J4ssCP3l0L1fyBjxwZNWqbtlJGLUv"})
  if response.status_code == 200:
    # print("sucessfully fetched the data")
    return response.json()
  else:
    print(f"There's a {response.status_code} error with your request")




data = get_data('https://images-api.nasa.gov/search?q=nebula&media_type=image') # Search input: nebula
items = data['collection']['items']
total_hits = data['collection']['metadata']['total_hits']   # Total number of search results
total_pages = total_hits // 100 + 1  # Total pages
with open('nasa_data.csv', 'w', newline='', encoding="utf-8") as f:
  writer = csv.writer(f)
  writer.writerow(["id", "title", "desc"])
  for i in range(1, total_pages + 1):
    data = get_data('https://images-api.nasa.gov/search?q=nebula&media_type=image&page={}'.format(i)) # Search input: nebula
    items = data['collection']['items']
    for item in items:
      id = item['data'][0]['nasa_id']
      title = item['data'][0]['title']
      desc = item['data'][0]['description']
      writer.writerow([id, title, desc])


df = pd.read_csv("nasa_data.csv")
documents = df['desc'].values.astype("U")
df['desc'] = df['desc'].pipe(hero.clean)
vectorizer = TfidfVectorizer(stop_words='english')
features = vectorizer.fit_transform(documents)

k = 20
model = KMeans(n_clusters=k, init='k-means++', max_iter=100, n_init=1)
model.fit(features)

df['cluster'] = model.labels_


################################################################################


with open('./nasa_data.pickle', 'wb') as f:
    pickle.dump(model, f)

# with gzip.GzipFlie('./nasa_data.pgz', 'w') as f:
#     pickle.dump(nasa_data, f)
