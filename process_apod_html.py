# Usage:

# First run

# wget -r -l1 -nd -np -A.html -erobots=off -nc http://apod.nasa.gov/apod/archivepixFull.html

# to download the HTML files from the Astronomy Picture of the Day archive.

# Then run

# process_apod_html.py <output_directory>

# to write a TSV (tab-separated value) file containing the descriptions and
# image URLs.

import csv
from html.parser import HTMLParser
from io import StringIO
import os
import re
import sys

# from https://stackoverflow.com/questions/753052/strip-html-from-strings-in-python
class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.text = StringIO()
    def handle_data(self, d):
        self.text.write(d)
    def get_data(self):
        return self.text.getvalue()

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


html_directory = sys.argv[1]
html_filenames = os.listdir(html_directory)

out_file = open('apod_metadata.tsv', 'wt')
tsv_writer = csv.writer(out_file, delimiter='\t')
tsv_writer.writerow(['id', 'title', 'description', 'thumbnail_url', 'full_resolution_url'])

id = 0
for html_filename in html_filenames:
    print(html_filename)
    if not html_filename.startswith('ap'):
        continue
    if html_filename.startswith('aptree'):
        continue

    html_file = open(os.path.join(html_directory, html_filename), encoding='latin1')
    html_contents = html_file.read()

    title = re.match('.*<title>(?P<title>.*)</title>.*', html_contents, re.DOTALL).group('title').strip()
    title = ' '.join(title.replace('\r', ' ').strip().split())
    print(title)

    if html_contents.find('iframe') != -1 \
      or html_contents.find('<object') != -1 \
      or html_contents.find('<OBJECT') != -1 \
      or html_contents.find('<button') != -1 \
      or html_contents.find('http://cdn-akm.vmixcore.com') != -1 \
      or html_contents.find('<embed') != -1 \
      or html_contents.find('.mpg') != -1 \
      or html_contents.find('<applet') != -1 \
      or html_contents.find('onMouseOver') != -1 \
      or html_contents.find('.mp4') != -1 \
      or html_contents.find('<area') != -1 \
      or html_contents.find('.mov') != -1 \
      or html_contents.find('www.astrobin.com') != -1 \
      or html_contents.find('http://apod.nasa.gov/apod/ap080525m.html') != -1 \
      or html_contents.find('youtube.com') != -1 \
      or html_contents.find('.wmv') != -1:
        print(title + ' is a video, game, or something else more complicated than an image; skipping')
        continue

    thumbnail_url = re.match('.*<(IMG|img)\s+(SRC|src)="(?P<url>[\S]+)".*', html_contents, re.DOTALL).group('url')
    full_resolution_url = re.match('.*<(A|a) href="(?P<url>[\S]+\.(gif|jpeg|JPG|jpg|png|tif) ?)".*', html_contents, re.DOTALL).group('url')

    raw_text = strip_tags(html_contents)
    description = re.match('.*Explanation:(?P<description>.*?)(Tomorrow\'s picture|For more information|We keep an|Next picture).*', raw_text, re.DOTALL).group('description')
    description = ' '.join(description.strip().split())

    tsv_writer.writerow([id, title, description, thumbnail_url, full_resolution_url])

    id += 1
