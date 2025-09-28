# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import datetime

# # ---------------- Load Data ----------------
# products = pd.read_csv("/data/products.csv")
# users = pd.read_csv("/data/users.csv")
# transactions = pd.read_csv("/data/transactions.csv")

# # Merge transactions with product and user info
# df = transactions.merge(products, on="product_id", how="left")
# df = df.merge(users, left_on="retailer_id", right_on="retailer_id", how="left")

# # ---------------- 1. Top Selling ----------------
# def top_selling_products(top_n=5):
#     top = df.groupby("product_id")["quantity"].sum().sort_values(ascending=False).head(top_n)
#     return products[products["product_id"].isin(top.index)][["product_id","name"]]

# # ---------------- 2. Personalized Products ----------------
# products["features"] = products["name"].fillna("") + " " + products["category"].fillna("") + " " + products["description"].fillna("")
# vectorizer = TfidfVectorizer()
# tfidf_matrix = vectorizer.fit_transform(products["features"])
# cosine_sim = cosine_similarity(tfidf_matrix)

# def personalized_products(retailer_id, top_n=5):
#     retailer_products = df[df["retailer_id"] == retailer_id]["product_id"].unique()
#     if len(retailer_products) == 0:
#         return ["No purchase history - fallback to top selling"]
    
#     last_product = retailer_products[-1]
#     idx = products[products["product_id"] == last_product].index[0]
    
#     sim_scores = list(enumerate(cosine_sim[idx]))
#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]
#     indices = [i[0] for i in sim_scores]
    
#     return products.iloc[indices][["product_id","name"]]

# # ---------------- 3. Location-Based Products ----------------
# def location_based_products(retailer_id, top_n=5):
#     city = users.loc[users["retailer_id"] == retailer_id, "city"].values[0]
#     loc_df = df[df["city"] == city]
#     top_loc = loc_df.groupby("product_id")["quantity"].sum().sort_values(ascending=False).head(top_n)
#     return products[products["product_id"].isin(top_loc.index)][["product_id","name"]]

# # ---------------- 4. Trending Products ----------------
# def trending_products(top_n=5):
#     df["order_ts"] = pd.to_datetime(df["order_ts"])   # ensure datetime
#     thirty_days_ago = pd.Timestamp.today() - pd.Timedelta(days=30)
#     recent = df[df["order_ts"] >= thirty_days_ago]
    
#     trend = recent.groupby("product_id")["quantity"].sum().sort_values(ascending=False).head(top_n)
#     return products[products["product_id"].isin(trend.index)][["product_id","name"]]


# # ---------------- Final Engine ----------------
# def recommend_engine(retailer_id):
#     return {
#         "Top Selling Products": top_selling_products().values.tolist(),
#         "Personalized Products": personalized_products(retailer_id).values.tolist(),
#         "Location-Based Products": location_based_products(retailer_id).values.tolist(),
#         "Trending Products": trending_products().values.tolist()
#     }

# # ---------------- Run Example ----------------
# if __name__ == "__main__":
#     retailer_id = int(input("Enter Retailer ID: "))
#     recs = recommend_engine(retailer_id)
    
#     for k,v in recs.items():
#         print(f"\n{k}:")
#         for item in v:
#             print(" -", item[1])



import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import datetime
import os

# ---------------- Helper to read CSV safely ----------------
def safe_read_csv(file_path):
    encodings = ['utf-8', 'latin1']
    for enc in encodings:
        try:
            return pd.read_csv(file_path, encoding=enc, on_bad_lines='skip')
        except FileNotFoundError:
            print(f"❌ File not found: {file_path}")
            return pd.DataFrame()
        except pd.errors.ParserError:
            print(f"⚠ Malformed lines detected in {file_path}, skipping bad lines.")
            continue
        except Exception as e:
            print(f"❌ Error reading {file_path}: {e}")
            continue
    print(f"❌ Failed to read {file_path} with tried encodings.")
    return pd.DataFrame()

# ---------------- Paths ----------------
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))

products = safe_read_csv(os.path.join(BASE_DIR, "products.csv"))
users = safe_read_csv(os.path.join(BASE_DIR, "users.csv"))
transactions = safe_read_csv(os.path.join(BASE_DIR, "transactions.csv"))

if products.empty or users.empty or transactions.empty:
    print("❌ One or more CSV files could not be loaded. Please check the files.")
    exit()

# Merge transactions with product and user info
df = transactions.merge(products, on="product_id", how="left")
df = df.merge(users, left_on="retailer_id", right_on="retailer_id", how="left")

# ---------------- 1. Top Selling ----------------
def top_selling_products(top_n=5):
    top = df.groupby("product_id")["quantity"].sum().sort_values(ascending=False).head(top_n)
    return products[products["product_id"].isin(top.index)][["product_id","name"]]

# ---------------- 2. Personalized Products ----------------
products["features"] = products["name"].fillna("") + " " + products["category"].fillna("") + " " + products["description"].fillna("")
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(products["features"])
cosine_sim = cosine_similarity(tfidf_matrix)

def personalized_products(retailer_id, top_n=5):
    retailer_products = df[df["retailer_id"] == retailer_id]["product_id"].unique()
    if len(retailer_products) == 0:
        return ["No purchase history - fallback to top selling"]
    
    last_product = retailer_products[-1]
    idx = products[products["product_id"] == last_product].index[0]
    
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]
    indices = [i[0] for i in sim_scores]
    
    return products.iloc[indices][["product_id","name"]]

# ---------------- 3. Location-Based Products ----------------
def location_based_products(retailer_id, top_n=5):
    city = users.loc[users["retailer_id"] == retailer_id, "city"].values[0]
    loc_df = df[df["city"] == city]
    top_loc = loc_df.groupby("product_id")["quantity"].sum().sort_values(ascending=False).head(top_n)
    return products[products["product_id"].isin(top_loc.index)][["product_id","name"]]

# ---------------- 4. Trending Products ----------------
def trending_products(top_n=5):
    df["order_ts"] = pd.to_datetime(df["order_ts"], errors='coerce')  # handle bad dates
    thirty_days_ago = pd.Timestamp.today() - pd.Timedelta(days=30)
    recent = df[df["order_ts"] >= thirty_days_ago]
    
    trend = recent.groupby("product_id")["quantity"].sum().sort_values(ascending=False).head(top_n)
    return products[products["product_id"].isin(trend.index)][["product_id","name"]]

# ---------------- Final Engine ----------------
def recommend_engine(retailer_id):
    return {
        "Top Selling Products": top_selling_products().values.tolist(),
        "Personalized Products": personalized_products(retailer_id).values.tolist(),
        "Location-Based Products": location_based_products(retailer_id).values.tolist(),
        "Trending Products": trending_products().values.tolist()
    }

# ---------------- Run Example ----------------
if __name__ == "__main__":
    try:
        retailer_id = int(input("Enter Retailer ID: "))
        recs = recommend_engine(retailer_id)
        
        for k,v in recs.items():
            print(f"\n{k}:")
            for item in v:
                print(" -", item[1])
    except Exception as e:
        print(f"❌ Error running recommendation engine: {e}")
