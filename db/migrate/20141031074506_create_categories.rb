class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.belongs_to :budget
      t.string :name

      t.timestamps
    end
  end
end
