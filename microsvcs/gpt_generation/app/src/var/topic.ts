const _topic_list = ["Diversity and Inclusion (D&I) Initiatives", "Cultural Competence", "Gender Equality", "LGBTQ+ Inclusion", "Disability Inclusion", "Racial and Ethnic Diversity", "Age Diversity", "Mental Health Awareness", "Workplace Inclusion", "Inclusive Technology", "Community Engagement"];
const _randomised = Math.floor(Math.random() * _topic_list.length);
export const RANDOM_TOPIC: string = _topic_list[_randomised]
