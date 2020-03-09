# MC_Sandwich_Generator
This repo is used to make [RapGenerator_GPT2](https://github.com/Hongyu-Li/RapGenerator_GPT2) to be user-interactive. 

🙋 [Wanna Try?](http://111.229.1.57:3100/)

✉️ [Wanna Know More?](hl3099@columbia.edu)

### Frontend

* React + Docker 

```shell
docker build -t frontend .
docker run -d -p 3100:80 frontend 
```

###Backend

* Flask + Gunicorn

```shell
pip install -r requirements.txt
pip install gunicorn
gunicorn app:app -w 3 -b 0.0.0.0:8000 --timeout=400
```

*Note: most of backend codes are consistent with my RapGenerator_GPT2 repo. If you want to dig deeper, please also check that repo.*



