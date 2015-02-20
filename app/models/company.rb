class Company < ActiveRecord::Base
  attr_accessible :funds, :name, :records, :transaction_ids
  has_many :transactions
end
