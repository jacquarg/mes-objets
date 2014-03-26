Transaction = require('../models/transaction');

module.exports = Transactions = Backbone.Collection.extend({
    model: Transaction,
    url: 'transactions',
    // seed: function(){
    //     // not working
    //     console.log('seeding!')
    //     this.create({
    //         id:"1231512512341512412",
    //         title: "Pelle à picous",
    //         comment: "Très belle pelle",
    //         trace: [
    //                 "intermarché"
    //             ],
    //         category: [
    //             "Bricolage",
    //             "Pelle",
    //             "Pelle à picous"
    //         ],
    //         barcode: "1248193523",
    //         url: "http://pelle-a-picous.love"
    //     });
    // }
});