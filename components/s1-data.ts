
export const RULE_DATA = {
    "rules": [
        {
            "antecedents": [["gender", "man"], ["lighting", "natural_light"], ["skin_tone", "medium_skinned"]],
            "consequents": [["occupation", "transportation"]],
            "antecedents_text": "gender:man,lighting:natural_light,skin_tone:medium_skinned",
            "consequent_text": "  occupation:transportation"
        },
        {
            "antecedents": [["hairstyle", "short_hair"], ["lighting", "natural_light"], ["skin_tone", "medium_skinned"]],
            "consequents": [["occupation", "transportation"]],
            "antecedents_text": "hairstyle:short_hair,lighting:natural_light,skin_tone:medium_skinned",
            "consequent_text": "  occupation:transportation"
        },
        {
            "antecedents": [["lighting", "natural_light"], ["skin_tone", "medium_skinned"]],
            "consequents": [["occupation", "transportation"]],
            "antecedents_text": "lighting:natural_light,skin_tone:medium_skinned",
            "consequent_text": "  occupation:transportation"
        },
        {
            "antecedents": [["age", "adult"], ["gender", "man"], ["occupation", "industrial"]],
            "consequents": [["attire", "safetywear"]],
            "antecedents_text": "age:adult,gender:man,occupation:industrial",
            "consequent_text": "  attire:safetywear"
        },
        {
            "antecedents": [["attire", "casualwear"], ["gender", "man"], ["lighting", "natural_light"]],
            "consequents": [["occupation", "transportation"]],
            "antecedents_text": "attire:casualwear,gender:man,lighting:natural_light",
            "consequent_text": "  occupation:transportation"
        },
        {
            "antecedents": [["attire", "uniform"], ["expression", "smiling"], ["gender", "woman"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "attire:uniform,expression:smiling,gender:woman",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["age", "adult"], ["attire", "uniform"], ["background", "office"], ["expression", "smiling"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "age:adult,attire:uniform,background:office,expression:smiling",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["age", "adult"], ["attire", "uniform"], ["background", "office"], ["hairstyle", "long_hair"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "age:adult,attire:uniform,background:office,hairstyle:long_hair",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["age", "young"], ["attire", "casualwear"], ["background", "office"], ["gender", "man"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "age:young,attire:casualwear,background:office,gender:man",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["age", "young"], ["attire", "casualwear"], ["background", "office"], ["hairstyle", "short_hair"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "age:young,attire:casualwear,background:office,hairstyle:short_hair",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["age", "young"], ["attire", "casualwear"], ["background", "office"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "age:young,attire:casualwear,background:office",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["age", "adult"], ["attire", "uniform"], ["background", "office"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "age:adult,attire:uniform,background:office",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["attire", "casualwear"], ["background", "office"], ["facial_hair", "bearded"], ["lighting", "bright_light"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "attire:casualwear,background:office,facial_hair:bearded,lighting:bright_light",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["attire", "casualwear"], ["background", "office"], ["facial_hair", "bearded"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "attire:casualwear,background:office,facial_hair:bearded",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["age", "young"], ["attire", "casualwear"], ["hairstyle", "short_hair"], ["lighting", "bright_light"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "age:young,attire:casualwear,hairstyle:short_hair,lighting:bright_light",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["background", "office"], ["expression", "smiling"], ["gender", "woman"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "background:office,expression:smiling,gender:woman",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["background", "office"], ["gender", "woman"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "background:office,gender:woman",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["age", "young"], ["gender", "man"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "age:young,gender:man",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["expression", "smiling"], ["gender", "woman"], ["hairstyle", "short_hair"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "expression:smiling,gender:woman,hairstyle:short_hair",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["gender", "woman"], ["hairstyle", "short_hair"], ["lighting", "bright_light"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "gender:woman,hairstyle:short_hair,lighting:bright_light",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["background", "office"], ["gender", "man"]],
            "consequents": [["occupation", "tech"]],
            "antecedents_text": "background:office,gender:man",
            "consequent_text": "  occupation:tech"
        },
        {
            "antecedents": [["gender", "woman"], ["hairstyle", "short_hair"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "gender:woman,hairstyle:short_hair",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["gender", "woman"], ["lighting", "bright_light"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "gender:woman,lighting:bright_light",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["gender", "woman"], ["occupation", "service"]],
            "consequents": [["background", "home"]],
            "antecedents_text": "gender:woman,occupation:service",
            "consequent_text": "  background:home"
        },
        {
            "antecedents": [["gender", "man"], ["occupation", "law_enforcement"]],
            "consequents": [["expression", "serious"]],
            "antecedents_text": "gender:man,occupation:law_enforcement",
            "consequent_text": "  expression:serious"
        },
        {
            "antecedents": [["gender", "woman"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "gender:woman",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["occupation", "medical"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "occupation:medical",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["expression", "smiling"], ["hairstyle", "curly_hair"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "expression:smiling,hairstyle:curly_hair",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["expression", "smiling"], ["occupation", "medical"], ["skin_tone", "medium_skinned"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "expression:smiling,occupation:medical,skin_tone:medium_skinned",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["hairstyle", "curly_hair"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "hairstyle:curly_hair",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["expression", "smiling"], ["hair_color", "black_hair"], ["occupation", "medical"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "expression:smiling,hair_color:black_hair,occupation:medical",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["age", "adult"], ["gender", "man"], ["hair_color", "brown_hair"]],
            "consequents": [["occupation", "industrial"]],
            "antecedents_text": "age:adult,gender:man,hair_color:brown_hair",
            "consequent_text": "  occupation:industrial"
        },
        {
            "antecedents": [["expression", "neutral"], ["gender", "man"], ["hair_color", "brown_hair"]],
            "consequents": [["occupation", "industrial"]],
            "antecedents_text": "expression:neutral,gender:man,hair_color:brown_hair",
            "consequent_text": "  occupation:industrial"
        },
        {
            "antecedents": [["attire", "uniform"], ["hair_color", "blonde_hair"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "attire:uniform,hair_color:blonde_hair",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["hair_color", "blonde_hair"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "hair_color:blonde_hair",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["background", "office"], ["hair_color", "blonde_hair"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "background:office,hair_color:blonde_hair",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["background", "home"], ["occupation", "service"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "background:home,occupation:service",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["attire", "casualwear"], ["expression", "smiling"], ["gender", "woman"]],
            "consequents": [["skin_tone", "medium_skinned"]],
            "antecedents_text": "attire:casualwear,expression:smiling,gender:woman",
            "consequent_text": "  skin_tone:medium_skinned"
        },
        {
            "antecedents": [["expression", "smiling"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "expression:smiling",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["gender", "woman"], ["hairstyle", "long_hair"]],
            "consequents": [["expression", "smiling"]],
            "antecedents_text": "gender:woman,hairstyle:long_hair",
            "consequent_text": "  expression:smiling"
        },
        {
            "antecedents": [["gender", "woman"]],
            "consequents": [["expression", "smiling"]],
            "antecedents_text": "gender:woman",
            "consequent_text": "  expression:smiling"
        },
        {
            "antecedents": [["gender", "man"], ["occupation", "industrial"]],
            "consequents": [["expression", "serious"]],
            "antecedents_text": "gender:man,occupation:industrial",
            "consequent_text": "  expression:serious"
        },
        {
            "antecedents": [["age", "young"], ["gender", "woman"]],
            "consequents": [["background", "home"]],
            "antecedents_text": "age:young,gender:woman",
            "consequent_text": "  background:home"
        },
        {
            "antecedents": [["occupation", "industrial"]],
            "consequents": [["gender", "man"]],
            "antecedents_text": "occupation:industrial",
            "consequent_text": "  gender:man"
        },
        {
            "antecedents": [["occupation", "tech"]],
            "consequents": [["gender", "man"]],
            "antecedents_text": "occupation:tech",
            "consequent_text": "  gender:man"
        },
        {
            "antecedents": [["attire", "uniform"], ["expression", "smiling"], ["hairstyle", "long_hair"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "attire:uniform,expression:smiling,hairstyle:long_hair",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["attire", "uniform"], ["occupation", "medical"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "attire:uniform,occupation:medical",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["attire", "uniform"], ["gender", "woman"], ["setting", "office"]],
            "consequents": [["occupation", "medical"]],
            "antecedents_text": "attire:uniform,gender:woman,setting:office",
            "consequent_text": "  occupation:medical"
        },
        {
            "antecedents": [["age", "young"], ["attire", "uniform"]],
            "consequents": [["gender", "woman"]],
            "antecedents_text": "age:young,attire:uniform",
            "consequent_text": "  gender:woman"
        },
        {
            "antecedents": [["hairstyle", "bald"]],
            "consequents": [["gender", "man"]],
            "antecedents_text": "hairstyle:bald",
            "consequent_text": "  gender:man"
        }
    ]
}
