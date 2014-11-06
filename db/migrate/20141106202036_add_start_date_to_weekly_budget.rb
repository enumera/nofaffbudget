class AddStartDateToWeeklyBudget < ActiveRecord::Migration
  def change
    add_column :weekly_budgets, :start_date, :date
  end
end
