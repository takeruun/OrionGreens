/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  /** 楽天GORAゴルフ場検索APIは、 楽天GORAのゴルフ場をキーワード、エリア、緯度経度などで検索し、ゴルフ場情報を取得することが可能なAPIです。 */
  get: {
    query: {
      /** アプリケーションID */
      applicationId: string;
      /** アフィリエイトID */
      affiliateId?: string | undefined;
      /** レスポンス形式 */
      format?: string | undefined;
      /** キーワード */
      keyword?: string | undefined;
      /** エリアコード */
      areaCode?: number | undefined;
      /** 緯度 */
      latitude?: number | undefined;
      /** 経度 */
      longitude?: number | undefined;
      /** レスポンスバージョン */
      formatVersion?: string | undefined;
      /** 1ページあたりの取得件数 */
      hits?: number | undefined;
    };

    status: 200;
    /** OK */
    resBody: Types.GolfCourseResponse;
  };
}>;
