class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.integer :records
      t.float :funds

      t.timestamps
    end
  end
end
