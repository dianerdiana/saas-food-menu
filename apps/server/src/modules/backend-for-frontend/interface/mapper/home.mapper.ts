import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeMapper {
  mapHomeData(rows: any[]) {
    const firstRow = rows[0];

    const store = {};

    const recommendationMap = new Map<string, any>();

    if (firstRow) {
      store['id'] = firstRow.store_id;
      store['name'] = firstRow.store_name;
      store['description'] = firstRow.description;
      store['image'] = firstRow.image;
      store['address'] = firstRow.address;
    }

    for (const row of rows) {
      if (!row.recommendation_id) continue;

      if (!recommendationMap.has(row.recommendation_id)) {
        recommendationMap.set(row.recommendation_id, {
          id: row.recommendation_id,
          name: row.recommendation_name,
          displayMode: row.recommendation_display_mode,
          products: [],
        });
      }

      if (row.product_id) {
        recommendationMap.get(row.recommendation_id).products.push({
          id: row.product_id,
          name: row.product_name,
          price: row.product_price,
        });
      }
    }

    return {
      ...store,
      recommendations: Array.from(recommendationMap.values()),
    };
  }
}
