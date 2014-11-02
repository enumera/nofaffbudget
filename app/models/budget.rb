class Budget < ActiveRecord::Base
  attr_accessible :name

  has_many :categories
  has_many :weekly_budgets
  
end
