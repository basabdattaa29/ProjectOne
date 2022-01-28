
const path = require('path');
const ItemModel = require('../Model/Item');

exports.getFormDisplay = (req, res) => {
    res.render('Admin/addproduct', {
        title_page: "Home form",
        path: '/home_page'
    })
}

exports.postFormValue = (req, res) => {
    console.log("collected value form form:", req.body);
    const Itmname = req.body.iname;
    const Icatgry = req.body.icatgry;
    const IPrice = req.body.iprice;
    const Item_img = req.file;
    console.log("uploaded image:", Item_img);
    const ItmImg_url = Item_img.path;
    const ItmDesc = req.body.idesc;
    const Item = new ItemModel({
        ItemNm: Itmname,
        Itemcat: Icatgry,
        ItemPrice: IPrice,
        ItemImg: ItmImg_url,
        ItemDesc: ItmDesc,
    });
    Item.save().then(results => {
        console.log("Created product", results);

    }).catch(err => {
        console.log(err);

    })
    res.redirect('/itemtDet');
}

exports.getAdminDet = (req, res) => {
    ItemModel.find().then(Products => {
        console.log("product:", Products);
        res.render('Admin/itemdet', {
            title: "Item",
            data: Products,
            path: '/itemtDet'
        });

    }).catch(err => {
        console.log("Data fetching error", err);

    })
}

exports.editFormDisplay = (req, res) => {
    const item_id = req.params.eid;
    console.log(item_id);
    ItemModel.findById(item_id).then(products => {
        console.log(products);
        res.render('Admin/editPage', {
            title_page: "Edit Form",
            EditData: products,
            path: '/edit_form/:eid'
        })
    }).catch(err => {
        console.log(err);

    })
}

exports.postEditForm = (req, res) => {
    const item_id = req.body.mid;
    const upIname = req.body.iname;
    const upIcatgry = req.body.icatgry;
    const UpIPrice = req.body.iprice;
    const updated_img = req.file;
    console.log("Updated Image",
        updated_img);
    const UpItmImg_url = updated_img.path;
    const upItmDesc = req.body.idesc;
    ItemModel.findById(item_id).then(itemData => {
        itemData.ItemNm = upIname;
        itemData.Itemcat = upIcatgry;
        itemData.ItemPrice = UpIPrice;
        itemData.ItemImg = UpItmImg_url;
        itemData.ItemDesc = upItmDesc;

        return itemData.save().then(results => {
            console.log("Data Updated");
            res.redirect('/itemtDet');
        });

    }).catch(err => {
        console.log(err);

    })
}

exports.viewProductShop = (req, res) => {
    const item_id = req.params.eid;
    console.log(item_id);
    ItemModel.findById(item_id).then(products => {
        console.log(products);
        res.render('Admin/itemdetails', {
            title: "Item det",
            itemdata: products,
            path: '/itemProduct/:eid'
        })

    }).catch(err => {
        console.log(err);

    })

}