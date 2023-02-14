from stable_diffusion_pytorch import pipeline

def std_draw(search, cnt, img_uuid):
    prompts = [search]
    images = pipeline.generate(prompts)
  
    #../tempnode/sdf_img_data/
    images[0].save(f'../tempnode/sdf_img_data/{img_uuid}_{search}{str(cnt)}.jpg')
    
    return f'../tempnode/sdf_img_data/{img_uuid}_{search}{str(cnt)}.jpg'

# 사용할 라이브러리 설치 python
# pip install -r requirements.txt
