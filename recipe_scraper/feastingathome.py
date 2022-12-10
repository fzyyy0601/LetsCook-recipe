import json
import os
from time import sleep
from recipe_scrapers import scrape_me
import faker
import requests
from lxml import etree

def getImgUrl(content):
    html = etree.HTML(content)
    img_url = []
    for i in range(1, 17):
        tes = "//*[@id='main-content']/div/main/div/article[{}]/div[2]/h2/a/@href".format(
            i)
        img_url.append(html.xpath(tes))
    for i in img_url:
        print(i)

    return img_url


def crawl_recipe(url):
    content = downloadHtml(url)
    if content is not None:
        res = getImgUrl(content)
        print('res!!')
        print(res)
        return res
    else:
        return None


def downloadHtml(ur):
    headers = {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}
    response = requests.get(url, headers=headers, timeout=20)
    if response.status_code != 200:
        return None
    else:
        return response.text


def scrap_recipe(url):
    total = []
    if url is not None:
        for i in range(len(url)):
            try:
                scraper = scrape_me(url[i][0], wild_mode=True)
                data = {}
                data['url'] = url[i][0]
                data['totaltime'] = scraper.total_time()
                data['ingredients'] = scraper.ingredients()
                data['image'] = scraper.image()
                data['source'] = scraper.host()
                data['tag'] = ''
                data['title'] = scraper.title()
                data['instructions'] = scraper.instructions()
                total.append(data)
            except Exception as e:
                pass
            continue
    saveJsonData(total, 'feastingathome-1.json')  


def saveJsonData(data, outfile):
    with open(outfile, 'a', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)


if __name__ == "__main__":
    root_url = "https://www.feastingathome.com/category/healthy/page/{}"
    for i in range(2, 5):
        url = root_url.format(i)
        print(i)
        print('base url')
        print(url)
        print('******************')
        res = crawl_recipe(url)
        scrap_recipe(res)



