import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1alw6ga } from './Gora/GoraGolfCourseSearch/20170623';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://app.rakuten.co.jp/services/api/' : baseURL).replace(/\/$/, '');
  const PATH0 = '/Gora/GoraGolfCourseSearch/20170623';
  const GET = 'GET';

  return {
    Gora: {
      GoraGolfCourseSearch: {
        $20170623: {
          /**
           * 楽天GORAゴルフ場検索APIは、 楽天GORAのゴルフ場をキーワード、エリア、緯度経度などで検索し、ゴルフ場情報を取得することが可能なAPIです。
           * @returns OK
           */
          get: (option: { query: Methods_1alw6ga['get']['query'], config?: T | undefined }) =>
            fetch<Methods_1alw6ga['get']['resBody'], BasicHeaders, Methods_1alw6ga['get']['status']>(prefix, PATH0, GET, option).json(),
          /**
           * 楽天GORAゴルフ場検索APIは、 楽天GORAのゴルフ場をキーワード、エリア、緯度経度などで検索し、ゴルフ場情報を取得することが可能なAPIです。
           * @returns OK
           */
          $get: (option: { query: Methods_1alw6ga['get']['query'], config?: T | undefined }) =>
            fetch<Methods_1alw6ga['get']['resBody'], BasicHeaders, Methods_1alw6ga['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1alw6ga['get']['query'] } | undefined) =>
            `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
