import pickle
import gzip

# with open('./model/xgboost-iris.pgz', 'rb') as f:
#     myModel = pickle.load(f)
    
# with gzip.open('./model/xgboost-iris.pgz', 'r') as f:
#     model = pickle.load(f)

with gzip.open('./xgboost-iris.pgz', 'r') as f:
    myModel = pickle.load(f)

class Model:
    def __init__(self):
        self.model = None

    def predict(self, input):
        pred = myModel.predict(input)[0]
        print(pred)
        return pred