import Feature from '../models/Feature.js'; 

export const getFeatures = async (req, res) => {
    try {
        const searchQuery = req.query.search;

        let filter = {};
        if (searchQuery) {
            filter.content = { $regex: searchQuery, $options: 'i' };
        }

        const features = await Feature.find(filter);

        res.render('features/index', { 
            features, 
            title: 'Features List',
            searchQuery 
        });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

export const getFeature = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) return res.status(404).render('error', { message: 'Feature not found' });
        res.render('features/show', { feature });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

export const showAddFeatureForm = (req, res) => {
    res.render('features/add', { 
        formType: 'create',
        title: 'Add New Feature' 
    });
};

export const addFeature = async (req, res) => {
    try {
        const newFeature = new Feature({ content: req.body.content });
        await newFeature.save();
        res.redirect('/features'); 
    } catch (error) {
        res.status(400).render('error', { error });
    }
};

export const showEditFeatureForm = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) return res.status(404).render('error', { message: 'Feature not found' });

        res.render('features/edit', { feature, formType: 'update', title: 'Edit Feature', searchQuery: '' });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

export const updateFeature = async (req, res) => {
    try {
        await Feature.findByIdAndUpdate(req.params.id, { content: req.body.content });
        res.redirect('/features');
    } catch (error) {
        res.status(400).render('error', { error });
    }
};

export const deleteFeature = async (req, res) => {
    try {
        await Feature.findByIdAndDelete(req.params.id);
        res.redirect('/features'); 
    } catch (error) {
        res.status(500).render('error', { error });
    }
};
