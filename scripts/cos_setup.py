# -*- coding: utf-8 -*-
"""创建 COS 存储桶并上传作品集视频。密钥从环境变量读取，不落盘。"""
import os, sys
from tencentcloud.common import credential
from tencentcloud.cam.v20190116 import cam_client, models as cam_models
from qcloud_cos import CosConfig, CosS3Client

SECRET_ID = os.environ["TC_SECRET_ID"]
SECRET_KEY = os.environ["TC_SECRET_KEY"]
REGION = "ap-guangzhou"

FILES = [
    (r"E:\workspace-workuddy-TS\personal project-wb\作品集网站设计\_scratch\videos-original\drama-mermaid.mp4", "drama-mermaid.mp4"),
    (r"E:\workspace-workuddy-TS\personal project-wb\作品集网站设计\_scratch\videos-original\comic-drama.mp4", "comic-drama.mp4"),
    (r"E:\workspace-workuddy-TS\personal project-wb\作品集网站设计\_scratch\videos-original\seven-days.mp4", "seven-days.mp4"),
    (r"E:\workspace-workuddy-TS\personal project-wb\作品集网站设计\public\videos\ue5-short.mp4", "ue5-short.mp4"),
]

def get_appid():
    cred = credential.Credential(SECRET_ID, SECRET_KEY)
    client = cam_client.CamClient(cred, "ap-guangzhou")
    resp = client.GetUserAppId(cam_models.GetUserAppIdRequest())
    return resp.AppId

def main():
    appid = get_appid()
    print(f"APPID: {appid}")
    bucket = f"portfolio-videos-{appid}"
    cfg = CosConfig(Region=REGION, SecretId=SECRET_ID, SecretKey=SECRET_KEY)
    client = CosS3Client(cfg)

    # 创建桶（已存在则跳过）
    try:
        client.create_bucket(Bucket=bucket, ACL="public-read")
        print(f"created bucket: {bucket}")
    except Exception as e:
        if "BucketAlreadyOwnedByYou" in str(e) or "BucketAlreadyExists" in str(e):
            print(f"bucket exists: {bucket}")
        else:
            raise
    # 确保公有读
    client.put_bucket_acl(Bucket=bucket, ACL="public-read")
    print("acl set: public-read")

    # 上传视频
    for local, key in FILES:
        size_mb = os.path.getsize(local) / 1024 / 1024
        print(f"uploading {key} ({size_mb:.0f}MB)...", flush=True)
        client.upload_file(Bucket=bucket, Key=key, LocalFilePath=local,
                           ContentType="video/mp4", EnableMD5=False,
                           MAXThread=8)
        url = f"https://{bucket}.cos.{REGION}.myqcloud.com/{key}"
        print(f"  -> {url}")

    print("ALL_UPLOADS_DONE")
    print(f"BUCKET={bucket}")

if __name__ == "__main__":
    main()
