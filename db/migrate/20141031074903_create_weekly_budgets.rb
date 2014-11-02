class CreateWeeklyBudgets < ActiveRecord::Migration
  def change
    create_table :weekly_budgets do |t|
      t.integer :weekno
      t.belongs_to :budget
      t.float :start_fund
      t.float :current_fund

      t.timestamps
    end
  end
end
