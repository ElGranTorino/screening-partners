import moment from "moment"
export default {
    getFormattedDateString: (date, formatType) => moment(date).format(formatType),
    refactorPepsFetchedData: (data) => {
        return data.map((pep) => {
            const res = {};
            res.fullName = pep.caption;
            res.id = pep.id;
            res.type = pep.schema;
            res.nameVariations = pep.properties.name;
            res.nationality = pep.properties.nationality;
            res.aliases = pep.properties.alias;
            res.status = pep.properties.status;
            res.firstName = pep.properties.firstName;
            res.lastName = pep.properties.lastName;
            res.fatherName = pep.properties.fatherName;
            res.secondName = pep.properties.secondName;
            res.gender = pep.properties.gender;
            res.sourceUrl = pep.properties.sourceUrl;
            res.birthDate = pep.properties.birthDate;
            res.birthPlace = pep.properties.birthPlace;
            res.innCode = pep.properties.innCode;
            res.position = pep.properties.position;
            res.createdAt = pep.properties.createdAt;
            res.modifiedAt = pep.properties.modifiedAt;
            res.education = pep.properties.education;
            res.country = pep.properties.country;
            res.notes = pep.properties.notes;
            res.religion = pep.properties.religion;
            res.website = pep.properties.website;
            res.ethnicity = pep.properties.ethnicity
            res.weakAlias = pep.properties.weakAlias
            res.deathDate = pep.properties.deathDate
            return res;
        })
    },
    refactorNewsFetchedData: (data) => {
        return data.map((article, i) => {
            const refactored = {}
            refactored.id = `n-${i}-${Date.now()}`;
            refactored.url = article.url;
            refactored.body = article.body;
            refactored.title = article.title;
            refactored.date = article.pubDate;
            return refactored;
        })
    },
    scrollToTarget: (selector) => {
        const $el = document.querySelector(selector);
        const elementY = $el.getBoundingClientRect().top
        document.body.scroll({
            top: elementY,
            behavior: "smooth"
        })
    },
    isValidTarget: (str) => {
        str = str.replace(/\W+/, '')

        if(
            str.length > 3 &&
            str.length < 50
        ) { return true };

        return false;
    },
    createUrlQueryParam: (str) => str.split(/\W+/gi).join('+'),
}