import uuid
import os
def createDirectory(directory):
    try:
        if not os.path.exists('../tempnode/sdf_img_data/' + directory):
            os.makedirs('../tempnode/sdf_img_data/' + directory)
    except OSError:
        print("Error: Failed to create the directory.")
        
        
        

a = str(uuid.uuid4())
search = "asdads"
cnt = 1
cnt = str(cnt)

te = f'../tempnode/sdf_img_data/{a}.jpg'
