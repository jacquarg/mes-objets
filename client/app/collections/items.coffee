Item = require("../models/item")
module.exports = Items = Backbone.Collection.extend(
  model: Item
  url: "items"
  seed: ->
    console.log "receipt seeding :D"
    @create
      item:
        context: "http://respublica.io/schema/items.jsonld"
        label: "Pour l'exemple"
        wikidata:
            Q1570277:
              label:
                fr: "Pour l'exemple"
                en: "King & Country"
        barcode: "1234567890"
      tags:
        wikidata:
          P31:
            Q5294:
              label:
                fr: "DVD"
                en: "DVD"
      attachements:
        pictures:
          thumbnail: "http://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/1/6/1/5050582876161.jpg"
      history:
        context: "http://respublica.io/schema/transaction-history.jsonld"
        last:
          from:
            label:
              fr: 'Intermarché'
            wikidata: 'Q3153200'
          transaction:
            type:
              label:
                fr: "vente"
              wikidata: "Q194189"
            date: ((new Date).toJSON())
      comment:
        "voici un exemple d'objet ajouté à votre inventaire personnel !"
)

# seed: function(){
#     // not working
#     console.log('seeding!')
#     this.create({
#         id:"1231512512341512412",
#         title: "Pelle à picous",
#         comment: "Très belle pelle",
#         trace: [
#                 "intermarché"
#             ],
#         category: [
#             "Bricolage",
#             "Pelle",
#             "Pelle à picous"
#         ],
#         barcode: "1248193523",
#         url: "http://pelle-a-picous.love"
#     });
# }
