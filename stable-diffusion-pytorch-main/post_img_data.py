import requests


def postImgData(search, binary_data, image_file, image_file_name, rand):
    datas = {
        "img_search":search,
        "img_binary":binary_data,
        "img_path":image_file,
        "img_file_name":image_file_name,
        "img_uuid":rand
    }

    url = "http://localhost:3000/api/postTestinput"

    response = requests.post(url, data=datas)
