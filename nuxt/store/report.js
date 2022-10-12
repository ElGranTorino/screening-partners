export const state = () => ({
    
    selectedSanctions: [],
    selectedPeps: [],
    selectedNews: []
});

export const mutations = {
    removeSelectedItems(s){
        s.selectedSanctions = [];
        s.selectedPeps = [];
        s.selectedNews = [];
    },
    addSelectedPep(s, newPep){
        s.selectedPeps.push(newPep)
    },
    addSelectedNews(s, newArticle){
        s.selectedNews.push(newArticle)
    },
    addSelectedSanction(s, newSanction){
        s.selectedSanctions.push(newSanction)
    },

    removeSelectedPep(s, removedPepId){
        s.selectedPeps = s.selectedPeps.filter((pep) => pep.id !== removedPepId)
    },
    removeSelectedNews(s, removedArticleId){
        s.selectedNews = s.selectedNews.filter((article) => article.id !== removedArticleId)
    },
    removeSelectedSanction(s, removedSanctionId){
        s.selectedSanctions = s.selectedSanctions.filter((article) => article.id !== removedSanctionId)
    },
};


export const actions = {

}

export const getters = {
    selectedSanctions: (s) => s.selectedSanctions,
    selectedPeps: (s) => s.selectedPeps,
    selectedNews: (s) => s.selectedNews,

    checkIfSelected: (s) => (entity, id) => {
        if(entity === 'sanction'){
            return s.selectedSanctions.find((selected) => selected.id === id)
        } else if (entity === 'news') {
            return s.selectedNews.find((selected) => selected.id === id)
        } else if (entity === 'pep') {
            return s.selectedPeps.find((selected) => selected.id === id)
        }
    },

    totalSelectedEntries: (s) => {
        return s.selectedNews.length + s.selectedSanctions.length + s.selectedPeps.length;
    }
}