class WeeklyBudget < ActiveRecord::Base
  attr_accessible :budget_id, :current_fund, :start_fund, :weekno, :end_date, :start_date

  belongs_to :budget
  has_many :transactions
  

end
