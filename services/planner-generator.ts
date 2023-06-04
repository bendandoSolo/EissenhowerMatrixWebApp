import dayjs from 'dayjs';

import {
    AlignmentType,
    BorderStyle,
    Document,
    HeadingLevel,
    Packer,
    PageMargin,
    Paragraph,
    TabStopPosition,
    TabStopType,
    Table,
    TableCell,
    TableRow,
    TextRun,
    UnderlineType,
    WidthType
  } from 'docx';

  import TodoType from '../types/Todo';

  export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create (eissenhowerValues: TodoType[]): Document {

      const document = new Document({
        styles: {
        },
        sections: [
          {
            properties: {
                page: {
                    margin: {
                        top: 500,
                        right: 500,
                        bottom: 1000,
                        left: 500
                    }
                }
            },
            children: [
              this.CreateDateOfNextWeek(),
              this.ShowEissenhowerValues(eissenhowerValues),
              this.createHeading(''),
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: 'BENDANDO HIGH PERFORMANCE WEEKLY PRODUCTIVITY PLANNER',
                        bold: true,
                        underline: {
                          type: UnderlineType.SINGLE,
                          color: '000000'
                      },
                      color: '000000'
                    })
                ]
            }),
              this.createHeading(''),
              this.createHeading('Long Term Goals'),
              this.createHeading(''),
              this.createGoalsTable(),
              this.createHeading(''),
              this.createHeading('PROJECTS AND NEXT STEPS'),
              this.createHeading(''),
              this.createProjectsTable(),
              this.createHeading(''),
              this.peopleToContactTable(),
              this.createHeading(''),
              this.createHeading(''),
              this.createHeading(''),
              this.createHeading(''),
              this.createEissenhowerMatrix(eissenhowerValues),
              this.createHeading(''),
              this.createDailyProgressReportTables()
            ]
          }]
      });
      return document;
    }

  // export class DocumentCreator {
  //   // tslint:disable-next-line: typedef
  //   public create ([experiences, educations, skills, achivements]): Document {
  //     const document = new Document({
  //       sections: [
  //         {
  //           children: [
  //             new Paragraph({
  //               text: 'Dolan Miu',
  //               heading: HeadingLevel.TITLE
  //             }),
  //             this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
  //             this.createHeading('Education'),
  //             ...educations
  //               .map(education => {
  //                 const arr: Paragraph[] = [];
  //                 arr.push(
  //                   this.createInstitutionHeader(
  //                     education.schoolName,
  //                     `${education.startDate.year} - ${education.endDate.year}`
  //                   )
  //                 );
  //                 arr.push(
  //                   this.createRoleText(
  //                     `${education.fieldOfStudy} - ${education.degree}`
  //                   )
  //                 );

  //                 const bulletPoints = this.splitParagraphIntoBullets(
  //                   education.notes
  //                 );
  //                 bulletPoints.forEach(bulletPoint => {
  //                   arr.push(this.createBullet(bulletPoint));
  //                 });

  //                 return arr;
  //               })
  //               .reduce((prev, curr) => prev.concat(curr), []),
  //             this.createHeading('Experience'),
  //             ...experiences
  //               .map(position => {
  //                 const arr: Paragraph[] = [];

  //                 arr.push(
  //                   this.createInstitutionHeader(
  //                     position.company.name,
  //                     this.createPositionDateText(
  //                       position.startDate,
  //                       position.endDate,
  //                       position.isCurrent
  //                     )
  //                   )
  //                 );
  //                 arr.push(this.createRoleText(position.title));

  //                 const bulletPoints = this.splitParagraphIntoBullets(
  //                   position.summary
  //                 );

  //                 bulletPoints.forEach(bulletPoint => {
  //                   arr.push(this.createBullet(bulletPoint));
  //                 });

  //                 return arr;
  //               })
  //               .reduce((prev, curr) => prev.concat(curr), []),
  //             this.createHeading('Skills, Achievements and Interests'),
  //             this.createSubHeading('Skills'),
  //             this.createSkillList(skills),
  //             this.createSubHeading('Achievements'),
  //             ...this.createAchivementsList(achivements),
  //             this.createSubHeading('Interests'),
  //             this.createInterests(
  //               'Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing.'
  //             ),
  //             this.createHeading('References'),
  //             new Paragraph(
  //               'Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk'
  //             ),
  //             new Paragraph('More references upon request'),
  //             new Paragraph({
  //               text:
  //                 'This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.',
  //               alignment: AlignmentType.CENTER
  //             })
  //           ]
  //         }
  //       ]
  //     });

  //     return document;
  //   }

  //   public createContactInfo (
  //     phoneNumber: string,
  //     profileUrl: string,
  //     email: string
  //   ): Paragraph {
  //     return new Paragraph({
  //       alignment: AlignmentType.CENTER,
  //       children: [
  //         new TextRun(
  //           `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
  //         ),
  //         new TextRun({
  //           text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
  //           break: 1
  //         })
  //       ]
  //     });
  //   }

   public ShowEissenhowerValues (values: object[]): Paragraph {
    const text = JSON.stringify(values);
    console.log(values);
    return new Paragraph({
       text
    });
   }

    public CreateDateOfNextWeek (): Paragraph {
        return new Paragraph(this.GetDateOfNextWeek());
    }

    public GetDateOfNextWeek (): string {
        const todaysDay = dayjs(); // Monday is day 1 but here week starts from Sunday i.e. 0, so 7 means next Monday.
        let nextMonday = todaysDay;
        if (todaysDay.day() !== 1) { // if today is not Monday
            if (todaysDay.day() === 0)
                 nextMonday = todaysDay.add(1, 'day');
            else
                nextMonday = todaysDay.add(7 - todaysDay.day() + 1, 'day');
        }
        return nextMonday.format('DD/MM/YY') + ' - ' + nextMonday.add(6, 'day').format('DD/MM/YY');
    }

    public createHeading (text: string): Paragraph {
      return new Paragraph({
         heading: HeadingLevel.HEADING_3,
          alignment: AlignmentType.CENTER,
          children: [
          new TextRun({
              text,
              bold: true,
              underline: {
                color: '000000'
            },
            color: '000000'
          })
        ]
        });
    }

    public createBorderedParagraph (text: string): Paragraph {
      return new Paragraph({
        text: 'I have borders on my top and bottom sides!',
        border: {
            top: {
                color: 'auto',
                space: 1,
                style: BorderStyle.THICK,
                size: 6
            },
            bottom: {
                color: 'auto',
                space: 1,
                style: BorderStyle.THICK,
                size: 6
            },
            left: {
              color: 'auto',
              space: 1,
              style: BorderStyle.THICK,
              size: 6
          },
          right: {
            color: 'auto',
            space: 1,
            style: BorderStyle.THICK,
            size: 6
        }
        }
      });
    }

    public createGoalsTable (): Table {
      return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        borders: {
          top: {
            color: '#000000',
            space: 1,
            style: BorderStyle.THICK,
            size: 12
          },
          bottom: {
              color: 'auto',
              space: 1,
              style: BorderStyle.THICK,
              size: 12
          },
          left: {
            color: 'auto',
            space: 1,
            style: BorderStyle.THICK,
            size: 12
          },
          right: {
          color: 'auto',
          space: 1,
          style: BorderStyle.THICK,
          size: 12
          }
        },
         rows: [
            new TableRow({
              children: [
                  new TableCell({
                      columnSpan: 2,
                      children: [
                        new Paragraph('“You have no idea how efficient, efficient people get, it’s completely off the chart” – JB Peterson'),
                        new Paragraph('The Average Worker spends 2.1 hours distracted, it takes 21 minutes to get back to work – USE DISTRACTION APP'),
                        new Paragraph('SET SHORT DEADLINES PARKINSON LAW'),
                        new Paragraph('bu-app.com  -> stoicism, Markus Aurelius assess your day'),
                        new Paragraph('DAY DREAMING TAKES AWAY FROM Your DREAMS'),
                        new Paragraph('MIT: START THE DAY WITH THE MOST IMPORTANT TASK '),
                        new Paragraph('PLAN ON SUNDAYS')
                    ],
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                        }
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        children: [
                          new Paragraph('PRIORITIES(must complete no matter what):'),
                          new Paragraph('TPlan day ahead, plan every night, review and execute in the morning'),
                          new Paragraph('Minimize distractions, tv/phone/social media, after work only'),
                          new Paragraph('Review Goals every week, record all new ones to clear mind')
                      ],
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE }
                          }
                      })
                  ]
              }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('BLOCK TIME: WAKE @ 7, WORK 8-7'),
                          new Paragraph('8-9.30 : [3]'),
                          new Paragraph('9.45 - 11.15 : [3]'),
                          new Paragraph('11.30 - 1 : [3]'),
                          new Paragraph('----------------'),
                          new Paragraph('1.45 - 3.15 : [3]'),
                          new Paragraph('3.30 - 5 : [3]'),
                          new Paragraph('5.15 - 6.45 : [3]')
                      ],
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE }
                          }
                      }),
                      new TableCell({
                        children: [
                          new Paragraph('BONUS WEEKLY TASKS:'),
                          new Paragraph('PRIMARY: KEEP JOB: 12+ POMODOROS'),
                          new Paragraph('SECONDARY 1: Beat Jez @ Tennis, 1x Tennis/Week, 1x Cardio/Week'),
                          new Paragraph('SECONDARY 2: No Smoking'),
                          new Paragraph('SECONDARY 3: SOL, Counselling, Date/fortnight, Movie/week')
                      ],
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE }
                          }
                      })
                  ]
              })
      ]
    });
  }

  public createProjectsTable (): Table {
    return new Table({
      width: {
          size: 100,
          type: WidthType.PERCENTAGE
      },
       rows: [
          new TableRow({
              children: [
                  new TableCell({
                      children: [
                        new Paragraph('')
                    ]
                    }),
                    new TableCell({
                        children: [
                          new Paragraph('')
                      ]
                      }),
                      new TableCell({
                        children: [
                          new Paragraph('')
                      ]
                      })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('1')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('1')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('1')
                        ]
                        })
                  ]
              }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('2')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('2')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('2')
                        ]
                        })
                  ]
              }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('3')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('3')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('3')
                        ]
                        })
                  ]
              }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('4')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('4')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('4')
                        ]
                        })
                  ]
              }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('5')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('5')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('5')
                        ]
                        })
                  ]
              }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('6')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('6')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('6')
                        ]
                        })
                  ]
              }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('7')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('7')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('7')
                        ]
                        })
                  ]
              }),
              new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph('8')
                      ]
                      }),
                      new TableCell({
                          children: [
                            new Paragraph('8')
                        ]
                        }),
                        new TableCell({
                          children: [
                            new Paragraph('8')
                        ]
                        })
                  ]
              })
    ]
  });
}

public peopleToContactTable (): Table {
    return new Table({
      width: {
          size: 100,
          type: WidthType.PERCENTAGE
      },
      borders: {
        top: {
          color: '#000000',
          space: 1,
          style: BorderStyle.NONE,
          size: 0
        },
        bottom: {
            color: 'auto',
            space: 1,
            style: BorderStyle.NONE,
            size: 0
        },
        left: {
          color: 'auto',
          space: 1,
          style: BorderStyle.NONE,
          size: 0
        },
        right: {
        color: 'auto',
        space: 1,
        style: BorderStyle.NONE,
        size: 0
        }
      },
      rows: [new TableRow({
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        heading: HeadingLevel.HEADING_2,
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: 'PEOPLE TO CONTACT THIS WEEK',
                                bold: true,
                              color: '000000'
                            })
                        ]
                    })
              ],
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                  }
              }),
              new TableCell({
                children: [
                    new Paragraph({
                        heading: HeadingLevel.HEADING_2,
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: 'PEOPLE I AM WAITING ON',
                                bold: true,
                              color: '000000'
                            })
                        ]
                    })
              ],
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                  }
              })
          ]
      })
]
});
}

public createEissenhowerSectionContent (names: string[], text: string): Paragraph[] | Paragraph {
    if (names.length === 0) {
          return new Paragraph({
            children: [
                new TextRun({
                    text,
                    bold: true,
                    color: '000000'
                })
            ],
            spacing: {
                before: 0,
                after: 1800
            }
        })
    // eslint-disable-next-line no-empty
    } else {
    }
    return new Paragraph('test Message');
}

// here we have reached limitations and want to move to a new library react print to pdf
public createEissenhowerMatrix (eissenhowerValues: TodoType[]): Table {

    // const hasPriority = (todo: TodoType): boolean => todo.priority !== 0;
    const UrgentAndImportantTaskNames = eissenhowerValues.filter((item) => item.priority === 1).map(item => item.name);
    alert(UrgentAndImportantTaskNames);
    const urgentNotImportant = eissenhowerValues.filter((item) => item.priority === 2).map(item => item.name);
    const noturgentAndImportant = eissenhowerValues.filter((item) => item.priority === 3).map(item => item.name);
    const noturgentNotImportant = eissenhowerValues.filter((item) => item.priority === 4).map(item => item.name);

    const urgentAndImportantTableContent = this.createEissenhowerSectionContent(UrgentAndImportantTaskNames, 'URGENT AND IMPORTANT:');

    const paragraphsArray = [
        new Paragraph('Paragraph 1'),
        // new Paragraph('Paragraph 2'),
        // new Paragraph('Paragraph 3')
    ];

    const innerTable = new Table({
            borders: {
              top: {
                color: '#000000',
                space: 1,
                style: BorderStyle.NONE,
                size: 0
              },
              bottom: {
                  color: 'auto',
                  space: 1,
                  style: BorderStyle.NONE,
                  size: 0
              },
              left: {
                color: 'auto',
                space: 1,
                style: BorderStyle.NONE,
                size: 0
              },
              right: {
              color: 'auto',
              space: 1,
              style: BorderStyle.NONE,
              size: 0
              }
            },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph('Inner Cell 1')],
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE }
                        }
                    }
                    ),
                    new TableCell({
                        children: [new Paragraph('Inner Cell 2')],
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE }
                        }
                    })
                ]
            })
               // Add more TableRow objects for more rows in your inner table
        ]
    });

    return new Table({
      width: {
          size: 100,
          type: WidthType.PERCENTAGE
      },
      borders: {
        top: {
          color: '#000000',
          space: 1,
          style: BorderStyle.THICK,
          size: 12
        },
        bottom: {
            color: 'auto',
            space: 1,
            style: BorderStyle.THICK,
            size: 12
        },
        left: {
          color: 'auto',
          space: 1,
          style: BorderStyle.THICK,
          size: 12
        },
        right: {
        color: 'auto',
        space: 1,
        style: BorderStyle.THICK,
        size: 12
        }
      },
       rows: [
          new TableRow({
              children: [
                  new TableCell({
                      children: [
                        innerTable
                        // new Paragraph({
                        //     text: 'URGENT AND IMPORTANT:',
                        //     spacing: {
                        //         before: 0,
                        //         after: 1800
                        //     }
                        // }),
                        // new Paragraph(urgentAndImportant.join('\n'))
                    ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                text: 'URGENT NOT IMPORTANT:',
                                spacing: {
                                    before: 0,
                                    after: 1800
                                }
                            }),
                            new Paragraph(urgentNotImportant.join('\n'))
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                          new Paragraph({
                              text: 'NOT URGENT AND IMPORTANT:',
                              spacing: {
                                  before: 0,
                                  after: 1800
                              }
                            }),
                            new Paragraph(noturgentAndImportant.join('\n'))
                      ]
                      }),
                      new TableCell({
                          children: [
                              new Paragraph({
                                  text: 'NOT URGENT NOT IMPORTANT:',
                                  spacing: {
                                      before: 0,
                                      after: 1800
                                  }
                              }),
                              new Paragraph(noturgentNotImportant.join('\n'))
                          ]
                      })
                  ]
              })
    ]
  });
}

public createDailyProgressReportTables (): Table {
    return new Table({
      width: {
          size: 100,
          type: WidthType.PERCENTAGE
      },
      borders: {
        top: {
          color: '#000000',
          space: 1,
          style: BorderStyle.THICK,
          size: 12
        },
        bottom: {
            color: 'auto',
            space: 1,
            style: BorderStyle.THICK,
            size: 12
        },
        left: {
          color: 'auto',
          space: 1,
          style: BorderStyle.THICK,
          size: 12
        },
        right: {
        color: 'auto',
        space: 1,
        style: BorderStyle.THICK,
        size: 12
        }
      },
       rows: [
          new TableRow({
              children: [
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'THINGS I NEED TO GET THIS WEEK',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    }),
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'MONDAY',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WAKE:                              MIT:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'PHYSIO:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WORK:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'EXERCISE:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'KG:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '[    /     ]',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    })
                ]
            }),
          new TableRow({
              children: [
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'TUESDAY',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WAKE:                              MIT:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'PHYSIO:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WORK:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'EXERCISE:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'KG:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '[    /     ]',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    }),
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WEDNESDAY',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WAKE:                              MIT:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'PHYSIO:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WORK:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'EXERCISE:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'KG:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '[    /     ]',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    })
                ]
            }),
          new TableRow({
              children: [
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'THURSDAY',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WAKE:                              MIT:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'PHYSIO:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WORK:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'EXERCISE:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'KG:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '[    /     ]',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    }),
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'FRIDAY',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WAKE:                              MIT:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'PHYSIO:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WORK:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'EXERCISE:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'KG:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '[    /     ]',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    })
                ]
            }),
          new TableRow({
              children: [
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'SATURDAY',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WAKE:                              MIT:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'PHYSIO:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WORK:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'EXERCISE:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'KG:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '[    /     ]',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    }),
                  new TableCell({
                      children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'SUNDAY',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WAKE:                              MIT:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'PHYSIO:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'WORK:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'EXERCISE:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'KG:',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        }),
                        new Paragraph(''),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        }),
                                        new TableCell({
                                            width: {
                                                size: 200,
                                                type: WidthType.DXA
                                            },
                                            children: [new Paragraph(' ')]
                                        })
                                    ]
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: '[    /     ]',
                                    bold: true,
                                    color: '000000'
                                })
                            ]
                        })
                      ]
                    })
                ]
            }),
    ]
  });
}

}
