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
    for k in range(60):
        res = "//*[@id='mntl-card-list-items_2-0-{}']/@href".format(k)
        if len(html.xpath(res)) > 0:
            img_url.append(html.xpath(res)[0])
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
                data['tag'] = 'vietnamese'
                data['title'] = scraper.title()
                data['instructions'] = scraper.instructions()
                total.append(data)
            except Exception as e:
                pass
            continue
    saveJsonData(total, 'd:/recipe-json/allrecipe-vietnamese.json')


def saveJsonData(data, outfile):
    with open(outfile, 'a', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)


if __name__ == "__main__":
    #url="https://www.allrecipes.com/recipes/721/world-cuisine/european/french/"
    #url="https://www.allrecipes.com/recipes/699/world-cuisine/asian/japanese/"
    #url="https://www.allrecipes.com/recipes/233/world-cuisine/asian/indian/"
    #url="https://www.allrecipes.com/recipes/695/world-cuisine/asian/chinese/"
    #url="https://www.allrecipes.com/recipes/728/world-cuisine/latin-american/mexican/"
    #url="https://www.allrecipes.com/recipes/702/world-cuisine/asian/thai/"
    url="https://www.allrecipes.com/recipes/703/world-cuisine/asian/vietnamese/"
    res = crawl_img(url)
    scrap_recipe(res)

