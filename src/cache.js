import { InMemoryCache, makeVar } from "@apollo/client/cache";

export const lineItemsVar = makeVar([]);
export const scoresVar = makeVar([]);
export const lenOfCatItemsVar = makeVar([]);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                lineItems: {
                    read() {
                        return lineItemsVar();
                    }
                },
                scores: {
                    read() {
                        return scoresVar();
                    }
                },
                lenOfCatItemsVar: {
                    read() {
                        return lenOfCatItemsVar();
                    }
                }
            }
        }
    }
});