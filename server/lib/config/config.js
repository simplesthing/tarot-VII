/**
 * Created by avacollins on 12/19/15.
 */

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || 'mongodb://localhost:27017/tarot-vii'
}
