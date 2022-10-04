export const state = () => ({
    toasts: [],
    activeModalWindow: {
        id: null,
        data: null
    },
    showTargetsToggles: false, // If true - show toggle buttons for adding PEP, sanction or news in reprot
});


export const actions = {
    
};

export const mutations = {
    addActiveModalWindow(s, options){
        s.activeModalWindow = {
            id: options.id,
            data: options.data
        }
    },
    removeActiveModalWindow: (s) => {
        s.activeModalWindow = {id: null, data: null}
    },
    updateTargetsToggles(s, newBoolean){
        s.showTargetsToggles = newBoolean
    }
};

export const getters = {
    activeModalWindow: (s) => s.activeModalWindow,
    toasts: (s) => s.toasts,
    showTargetsToggles: (s) => s.showTargetsToggles
}