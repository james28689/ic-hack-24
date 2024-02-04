interface Result {
    top_visited_n: { website: string, visits: number }[];
    top_search_terms_n: { term: string, count: number }[];
    incognito_search: number;
    outliers: string[];
    most_searched_people: { name: string, url: string }[];
    typical: { title: string, count: number }[];
}

export default Result;