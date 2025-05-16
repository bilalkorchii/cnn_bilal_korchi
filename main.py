from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
from tensorflow.keras.applications.efficientnet import preprocess_input

app = FastAPI()

# Allow frontend requests (adjust origins for your deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your TensorFlow model once at startup
model = tf.keras.models.load_model("finalmodel.keras")

class_names = [
    "Bottomwear",
    "Dress",
    "Eyewear",
    "Flip Flops",
    "Fragrance",
    "Headwear",
    "Jewellery",
    "Loungewear and Nightwear",
    "Makeup",
    "Sandal",
    "Shoes",
    "Ties",
    "Topwear",
    "Watches"
]

IMG_SIZE = (160, 160)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read uploaded file bytes
    contents = await file.read()

    # Open image, convert to RGB, resize
    image = Image.open(BytesIO(contents)).convert("RGB")
    image = image.resize(IMG_SIZE)

    # Preprocess image for EfficientNet model
    img_array = np.array(image).astype(np.float32)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dim

    # Make prediction
    preds = model.predict(img_array)

    # Extract predicted label and confidence score
    predicted_index = np.argmax(preds[0])
    predicted_label = class_names[predicted_index]
    confidence = float(preds[0][predicted_index])

    return {
        "success": True,
        "category": predicted_label,
        "confidence": confidence
    }
