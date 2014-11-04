class WeeklyBudget < ActiveRecord::Base
  attr_accessible :budget_id, :current_fund, :start_fund, :weekno

  belongs_to :budget
  has_many :transactions
  

end
