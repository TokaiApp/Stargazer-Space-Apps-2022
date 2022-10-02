import pickle
import gzip

with open('./nasa_data.pickle', 'rb') as f:
    myModel = pickle.load(f)
    
# with gzip.open('./model/nasa_data.pgz', 'r') as f:
#     model = pickle.load(f)

def predict(input):
    ...
    return myOutput