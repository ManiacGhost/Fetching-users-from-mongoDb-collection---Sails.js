module.exports = {
  primaryKey: 'id',
  schema: true,
  attributes: {
    id: {
      type: 'string',
      columnName: '_id',
      autoIncrement: true,
      unique: true
    },
    key: {
      type: 'string',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true
    },
    top_subjects: {
      type: 'json',
      columnType: 'array'
    },
    alternate_names: {
      type: 'json',
      columnType: 'array',
      defaultsTo: []
    }
  }
}; 