class Month {
  constructor({labels, integer}){
    this.labels = labels;
    this.integer = integer;
  }

  toString(){
    return this.labels[0];
  }

  toNumber(){
    return this.integer;
  }
}

Month.January = new Month(['january', 'janvier'], 0);
Month.February = new Month(['february', 'fevrier'], 1);
Month.March = new Month(['march', 'mars'], 2);
Month.April = new Month(['april', 'avril'], 3);
Month.Mai = new Month(['mai'], 4);
Month.June = new Month(['june', 'juin'], 5);
Month.July = new Month(['july', 'juillet'], 6);
Month.August = new Month(['august', 'aout'], 7);
Month.September = new Month(['september', 'septembre'], 8);
Month.October = new Month(['october', 'octobre'], 9);
Month.November = new Month(['november', 'novembre'], 10);
Month.December = new Month(['december', 'decembre'], 11);

export default Month