import 'dotenv/config';

import axiosClient from '@aspida/axios';
import { firefox, Locator } from 'playwright';

import api from './api/rakuten.ts/$api';
import { Methods } from './api/rakuten.ts/Gora/GoraGolfCourseSearch/20170623';

const isRecordVideo = process.env.IS_RECORD_VIDEO === 'true';
const isHeadless = process.env.IS_HEADLESS === 'true';

const checkHavingSoloPlan = async (elements: Locator[]): Promise<boolean> => {
  for (const element of elements) {
    // 親要素を取得
    const parent = element.locator('xpath=..');
    if (!parent) {
      continue;
    }
    const parentParent = parent.locator('xpath=..');
    if (!parentParent) {
      continue;
    }
    // <img>要素を取得
    const imgs = await parentParent.locator('img').all();
    if (imgs.length === 0) {
      continue;
    }

    const isSoloPlan = imgs.every(async (img) => {
      const src = await img.getAttribute('src');
      return (
        src ===
        'https://image.gora.golf.rakuten.co.jp/img/avatar/60X60/none.png'
      );
    });
    if (isSoloPlan) {
      return true;
    }
  }
  return false;
};

(async () => {
  // yarn run の引数を受け取る
  const args = process.argv.slice(2);

  const hitsArg = args.find((arg) => arg.startsWith('--hits='));
  const hits = hitsArg ? Number(hitsArg.split('=')[1]) : undefined;

  const areaCodeArg = args.find((arg) => arg.startsWith('--areaCode='));
  const areaCode = areaCodeArg ? Number(areaCodeArg.split('=')[1]) : undefined;

  // Setup
  const browser = await firefox.launch({
    headless: isHeadless,
    args: [
      '--lang=ja',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: isRecordVideo
      ? {
          dir: __dirname + '/../videos',
        }
      : undefined,
  });
  await context.route('**.jpg', (route) => route.abort());

  const page = await context.newPage();

  const client = api(axiosClient());
  const params: Methods['get']['query'] = {
    applicationId: process.env.RAKUTEN_APPLICATION_ID || '',
    affiliateId: process.env.RAKUTEN_AFFILIATE_ID || '',
    format: 'json',
    formatVersion: '2',
    hits,
    areaCode,
  };

  const res = await client.Gora.GoraGolfCourseSearch.$20170623.get({
    query: params,
  });

  for (const item of res.body.Items || []) {
    const url = item.golfCourseDetailUrl;
    if (!url) {
      continue;
    }

    await page.goto(url);
    await page.waitForTimeout(2000);

    // 利用規約が表示されたら
    if (await page.isVisible('text=Thank you for using Rakuten')) {
      page.getByText('1. Please arrive at least 30').evaluate((node) => {
        node.scrollTop = node.scrollHeight;
      });

      await page.getByText('I have read, understand, and').click();
      await page.getByRole('button', { name: 'I Agree' }).click();
    }

    await page.getByRole('button', { name: '人予約' }).click();

    await page.getByRole('button', { name: '検索する' }).click();
    await page.waitForTimeout(2000);

    const isDayChange = false;
    if (isDayChange) {
      await page.locator('#day').click();
      await page.locator('#day').fill('20');
      await page.getByRole('button', { name: '閉じる' }).click();
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: '検索する' }).click();
    }

    // 「あと1名で開催」テキストがない場合はスキップ
    if ((await page.getByText('あと1名で開催').count()) === 0) {
      continue;
    }

    // 「あと1名で開催」がある要素すべて取得
    const elements = await page.getByText('あと1名で開催').all();
    const isHavingSoloPlan = await checkHavingSoloPlan(elements);

    if (isHavingSoloPlan) {
      console.log('明日予約、1名開催プランを持っているコースです');
      console.log(url);
    }
  }

  await context.close();
  await browser.close();
})();
