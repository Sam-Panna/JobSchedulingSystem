from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

vectorizer = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))

def vectorize_task(task):
    text = task['title'] + ' ' + task['description'] + ' ' + task['priority']
    return vectorizer.transform([text]).toarray()[0]
