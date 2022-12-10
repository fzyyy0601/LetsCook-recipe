import json
import os
from time import sleep
from recipe_scrapers import scrape_me
import requests
from lxml import etree

base_1 = "https://www.bbcgoodfood.com/"


def getImgUrl(content):
    html = etree.HTML(content)
    img_url = []
    for k in range(1, 24):
        tes = "//*[@id='__next']/div[3]/main/div/div/div[1]/div[1]/div[2]/div[1]/div/ul/li[{}]/div/article/div[2]/a/@href".format(k)
        if len(html.xpath(tes)) > 0:
            img_url.append(base_1 + html.xpath(tes)[0])
    for i in img_url:
        print(i)

    return img_url


def crawl_img(url):
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
    response = requests.get(url, headers=headers, timeout=50)
    if response.status_code != 200:
        return None
    else:
        return response.text


def scrap_recipe(url):
    total = []
    if url is not None:
        for i in range(len(url)):
            try:
                print(url[i])
                scraper = scrape_me(url[i], wild_mode=True)
                data = {}
                data['url'] = url[i]
                data['totaltime'] = scraper.total_time()
                data['ingredients'] = scraper.ingredients()
                data['image'] = scraper.image()
                data['source'] = scraper.host()
                data['tag'] = 'american'
                data['title'] = scraper.title()
                data['instructions'] = scraper.instructions()
                total.append(data)
            except Exception as e:
                pass
            continue
    saveJsonData(total, 'bbcgoodfood-american.json')


def saveJsonData(data, outfile):
    with open(outfile, 'a', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)


if __name__ == "__main__":
    root_url = "https://www.bbcgoodfood.com/recipes/collection/american-recipes?page={}"
    for i in range(1, 5):
        url = root_url.format(i)
        print(i)
        print('base url')
        print(url)
        print('******************')
        res = crawl_img(url)
        scrap_recipe(res)
# vietnamese 28--> 2
#americain 66->3
#british 42-->2
#thai 38-->2
#french 52 --> 3