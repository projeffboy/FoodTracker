import torch
from PIL import Image
import open_clip
import pandas as pd
import time

df = pd.read_csv('our_foods.csv', header=None, dtype = str)
df2 = df.iloc[:,1]
df1 = df.iloc[:,0]
print(df2[0])
dflist=df2.values.tolist()
dflist_str = [str(x) for x in dflist]
##print(dflist_str[100000])

model, _, preprocess = open_clip.create_model_and_transforms('ViT-H-14', pretrained='laion2b_s32b_b79k')

image = preprocess(Image.open("junlin3.jpg")).unsqueeze(0)
textcat=torch.load("textcat0-377602.pt")
print(textcat[100000:100100], textcat.size())

##start = time.time()
####text = open_clip.tokenize(["asian chicken", "rice", "asian vegetables", "asian beef"])
##text = open_clip.tokenize(dflist_str)
##end = time.time()
##print((end-start),"sec")
##print(text[0])
##print(type(text))

with torch.no_grad(), torch.cuda.amp.autocast():
    textcat /= textcat.norm(dim=-1, keepdim=True)
    
    start=time.time()
    image_features = model.encode_image(image)
##    text_features = model.encode_text(text)
    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_probs = (100.0 * image_features @ textcat.T).softmax(dim=-1)
    end = time.time()
    print((end-start),"sec")
##    text_probs2 = (100.0 * image_features2 @ text_features2.T)

print(image_features, image_features.size())
print(textcat[100000:100100], textcat.size())
print(text_probs, text_probs.size())
print(text_probs[100000:100100])
probs_list  = text_probs[0].tolist()
print(len(probs_list))
print(probs_list[0])

biglist=[biglist[0] for biglist in sorted(enumerate(probs_list), key=lambda i:i[1], reverse=True)]
top_i_list=biglist[:10]
print(top_i_list)
top10foods=[]
for x in top_i_list:
    top10foods.append([(df.iloc[x,:]).tolist(), probs_list[x]])
print("Label probs:\n", top10foods)  # prints: [[1., 0., 0.]]

##with torch.no_grad(), torch.cuda.amp.autocast():
##    image_features = model.encode_image(image)
##    text_features = model.encode_text(text)
##    image_features2 = image_features/image_features.norm(dim=-1, keepdim=True)
##    text_features2 = text_features/text_features.norm(dim=-1, keepdim=True)
##
##    text_probs = (100.0 * image_features2 @ text_features2.T).softmax(dim=-1)
##    text_probs2 = (100.0 * image_features2 @ text_features2.T)
##
##print("Label probs:", text_probs, text_probs2)  # prints: [[1., 0., 0.]]

##i=352000
##with torch.no_grad(), torch.cuda.amp.autocast():
##    # image_features = model.encode_image(image)
##    while(i<378000):
##        start = time.time()
##        text_features = model.encode_text(text[i-1000:i])
##        end = time.time()
##        print(str(i), (end-start), "sec")
##        torch.save(text_features, "text_feat"+str(i-1000)+"-"+str(i-1)+".pt")
##        i=i+1000

##i=378000
##with torch.no_grad(), torch.cuda.amp.autocast():
##    # image_features = model.encode_image(image)
##    length=len(text[i-1000:])
##    print(length)
##    start = time.time()
##    text_features = model.encode_text(text[i-1000:])
##    end = time.time()
##    print(str(i), (end-start), "sec")
##    torch.save(text_features, "text_feat"+str(i-1000)+"-"+str(i-1000+length-1)+".pt")
