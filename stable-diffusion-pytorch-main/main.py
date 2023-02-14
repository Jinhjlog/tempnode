from typing import Optional
from fastapi import FastAPI
import sdf_one
import conv_image
import uuid;
import json
from starlette.middleware.cors import CORSMiddleware

import post_img_data

import uuid_test

#CORS
origins = [
    "*"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# 전달 받아야할 것 (검색어, 사용자 이미지 뽑아오기 위한 난수, 이미지 개수)
@app.get("/startSdf/{search}/{rand}")
def read_item(search: str,rand: str, cnt: Optional[int] = 1):
    ## uuid 생성
    img_uuid = str(uuid.uuid4())
    print(img_uuid)
    print(f"검색어 : {search}, 사진 cnt : {cnt}")

    ## 폴더 생성 ##
    #uuid_test.createDirectory(str(db_uuid))


    ## 여기 안에 stable-diffusion 코드를 넣는다 ## start
    
    # sdf_one.std_draw 함수는 매개변수로 ("검색어"(str), 반복 횟수 cnt(int))
    # 리턴 값으로는 파일명
    # 그림을 그린 후 output 폴더에 그림을 저장함
    
    # 정상코드 (강사님 컴퓨터에서 주석 해제)
    image_file = sdf_one.std_draw(search, cnt, img_uuid)
    
    ## 여기 안에 stable-diffusion 코드를 넣는다 ## end
    
    
    ## 이미지가 생성 되면 생성 된이미지를 바이너리 데이터로 변환 ## start
    # convB64text 함수의 매개변수는 이미지 파일명(ex : image.png)
    # 리턴값은 이미지를 텍스트로 변환한 값
    
    # 정상 코드
    binary_data = conv_image.convB64text(image_file)
    
    # 임시 테스트 코드
    # binary_data = conv_image.convB64text(f"test_image{cnt}.png")
    
    ## 이미지가 생성 되면 생성 된이미지를 바이너리 데이터로 변환 ## end
    
    
    # 임시 리턴
    # return { 
    #     "file_name":"이미지파일명" + str(cnt),
    #     "search": search,
    #     "draw_count": cnt,
    #     "binary_data" : "asdasd"
    # }
    # image_data << 여기에도 파일명이 들어가거나 검색어가 들어가게 한다.
    
    # api 전송(데이터베이스 입력) 정상 코드
    post_img_data.postImgData(search, binary_data, "../tempnode/sdf_img_data", str(img_uuid) + "_" +str(search) + str(cnt) + ".jpg", rand)
    
    
    # datas = {
    #     "img_search":"test api",
    #     "img_binary":"asd",
    #     "img_path":"adasd",
    #     "img_file_name":"asdasd"
    # }
    
    
    
    # 정상 코드 
    return { 
        "file_name":str(img_uuid) + "_" +str(search) + str(cnt) + ".jpg",
        "search": search,
        "draw_count": cnt,
        "binary_data" : binary_data,
        "db_uuid":rand
    }


@app.get("/getImage")
def getItem():
    binary_data = conv_image.convB64()
    # json형식으로 만들기, "파일이름", "이진 데이터"
    # image_dict={
    #         "test_image.png": binary_data
    # }
    # image_json = json.dumps(image_dict)
    return {"image_data" : binary_data}
    
    


# ai 코드 들어갈 함수
# 매개변수 (검색어, 사진 개수 )
def getSdf(search, cnt):
    return 0





