# SmartReco – Personalized Product Recommendation System for Retailers

AI-driven system that enhances the retailer experience on B2B platforms by providing *personalized product recommendations, **demand forecasts, and **vendor insights* based on real and synthetic sales data.

---

## 🧩 Problem Statement Reference

*Problem Statement ID:* HACXPB001  
*Problem Statement:* Personalized Product Recommendations for Enhanced Retailer Experience  
*Company:* Qwipo (B2B Retail Platform)

### 🎯 Reason to Choose
Retailers and vendors face inefficiencies in product distribution and demand forecasting, leading to overstocking, stockouts, and missed sales opportunities.  
By addressing this, we aim to:
- Improve *stock optimization*  
- Provide *personalized recommendations*  
- Enable *data-driven collaboration* between vendors and retailers  

This problem has *strong real-world relevance, high **scalability, and allows the application of **AI/ML models* effectively.

---

## 💡 Solution Overview

### Proposed Approach
An *AI-powered recommendation engine* that uses sales patterns, peer buying behavior, and product metadata to suggest optimal products for retailers while giving vendors visibility into market demand.

### Key Features / Modules
- 🛍 *Retailer Dashboard* – Personalized product recommendations and demand forecasts.  
- 📦 *Vendor Dashboard* – Retailer demand analytics and distribution insights.  
- 🤖 *Recommendation Engine* – Collaborative + Content-based filtering for accurate suggestions.  
- 🔍 *Explainability Layer* – Justifications such as “popular among peers” or “often bought together.”  
- 📊 *Data Management Module* – Synthetic data generation, cleaning, and preprocessing pipeline.  

---

## 🧱 System Architecture

### Data Flow
1. Retailer/Vendor logs in via frontend.  
2. Request is sent to backend (API layer).  
3. Backend fetches relevant data and sends it to ML engine.  
4. ML engine processes data → generates recommendations.  
5. Recommendations are returned with explanations to the frontend.  

---

## ⚙ Technology Stack

*Backend:*  
- FastAPI / Flask (Python) – API services  
- SQLAlchemy – ORM for DB handling  

*Frontend:*  
- React.js – Interactive dashboards  
- TailwindCSS / Bootstrap – Modern UI design  

*Database:*  
- PostgreSQL / SQLite – Product, retailer, and order data  

*ML/AI Frameworks:*  
- Scikit-learn – Collaborative & Content-based filtering  
- Pandas, NumPy – Preprocessing and analytics  
- Faker – Synthetic data generation  

*APIs & Libraries:*  
- REST APIs for communication  
- Matplotlib / Seaborn – Visual analytics  
- Alembic – Database migrations  

---

## 🧮 Algorithms & Models

### Chosen Algorithms
- *Collaborative Filtering* → learns from peer retailer behavior  
- *Content-Based Filtering* → ensures new products get visibility  

### Reason for Choice
Combining both ensures *relevant, balanced, and diverse* recommendations.

### Model Training & Testing
- Synthetic dataset (retailers, products, orders) generated with Faker  
- Data split: *80% train / 20% test*  
- Evaluation metrics: *Precision@K, **Recall@K*  
- Explainability validated through rule-based outputs  

---

## 🗃 Data Handling

*Data Sources:*  
- Synthetic data generated using Faker (retailers, products, orders)  
- Real-world product categories: Electronics, FMCG, Apparel, Durables, Essentials  

*Preprocessing Steps:*  
- Data cleaning (duplicates, inconsistencies)  
- Category normalization & encoding  
- Dataset splitting for ML  

*Storage / Pipeline:*  
Generate → Clean → Store (PostgreSQL) → Feed to ML Engine → Recommend

---

## 🚀 Implementation Plan

| Phase | Description |
|-------|--------------|
| *Phase 1* | Setup backend, generate synthetic data |
| *Phase 2* | Build ML engine (recommendation + explainability) |
| *Phase 3* | Create interactive dashboards (Retailer/Vendor) |
| *Phase 4* | Integrate frontend + backend + ML modules |
| *Phase 5* | Optimize and prepare for deployment (Docker/Cloud) |

---

## ⚡ Performance & Validation

*Evaluation Metrics:*
- Precision@K / Recall@K  
- Coverage (products recommended successfully)  
- Response Time per request  

*Testing Strategy:*
- ✅ Unit Testing → Individual modules (backend, ML engine)  
- 🔗 Integration Testing → Frontend–Backend–ML pipeline  
- 👥 User Acceptance Testing → Validate recommendation accuracy  

---

## ☁ Deployment & Scalability

*Deployment Plan*
- Backend containerized using *Docker*  
- Frontend hosted on *Netlify/Vercel*  
- Backend deployed to *AWS / Heroku*  
- REST APIs exposed for seamless data flow  

*Scalability*
- Modular architecture for independent scaling  
- Optimized database queries with indexing  
- Caching for repeat recommendations  
- Future scope for multi-region deployment  

---

## 📂 Project Structure
