class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.belongs_to :category
      t.float :amount
      t.belongs_to :weekly_budget

      t.timestamps
    end
  end
end
