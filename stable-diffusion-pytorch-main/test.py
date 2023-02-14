from stable_diffusion_pytorch import pipeline

prompts = ["cat reading a book"]

for i in range(100):
    images = pipeline.generate(prompts)
    images[0].save('./output/cat' + str(i) + '.jpg')

# 사용할 라이브러리 설치 python
# pip install -r requirements.txt
