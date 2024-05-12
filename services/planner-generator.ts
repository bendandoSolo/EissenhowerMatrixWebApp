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
                      columnSpan: 3,
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
                          new Paragraph('Review Goals every week, record all new ones to clear mind'),
                          new Paragraph('BLOCK TIME: WAKE @ 7, WORK 8-7')
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
                      })
                  ]
              }),
              new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 3,
                        children: [
                          new Paragraph('GOALS -> HABITS -> TRACKING')
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
                        columnSpan: 1,
                        children: [
                          new Paragraph('BABY:'),
                          new Paragraph('BABY:'),
                          new Paragraph('HEALTH:'),
                          new Paragraph('HEALTH:'),
                          new Paragraph('DANIEL:'),
                          new Paragraph('PRODUCTIVITY:'),
                          new Paragraph('PRODUCTIVITY:'),
                          new Paragraph('PRODUCTIVITY'),
                      ],
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE }
                          }
                      }),
                      new TableCell({
                        columnSpan: 1,
                        children: [
                          new Paragraph('Family time-weekend AM, 90 mins'),
                          new Paragraph('Date Night - 1x a week'),
                          new Paragraph('GYM 4 x a week'),
                          new Paragraph('Smoke only / no weekend AM'),
                          new Paragraph('30mins teaching - 1x a week'),
                          new Paragraph('Bed @ 1am, up @ 8am'),
                          new Paragraph('Read 26mins/night'),
                          new Paragraph('Work 9AM')
                      ],
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE }
                          }
                      }),
                      new TableCell({
                        columnSpan: 1,
                        children: [
                          new Paragraph('[     ] [     ]'),
                          new Paragraph('[     ] '),
                          new Paragraph('[ ] [ ] [ ] [ ]'),
                          new Paragraph('[  ] [  ] [  ] [  ] [  ] [  ] [  ]'),
                          new Paragraph('[     ] '),
                          new Paragraph('[  ] [  ] [  ] [  ] [  ] [  ] [  ]'),
                          new Paragraph('[  ] [  ] [  ] [  ] [  ] [  ] [  ]')
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

public createEissenhowerSectionContent (names: string[], text: string): Paragraph | Table {
    // due to this being a shit library we cannot set the table size and cannot have multiple paragraphs as subtables to Table rows children
    // so we can only display the top 8 tasks for each eissenhower category

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
       return new Table({
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
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text,
                                        bold: true,
                                        color: '000000'
                                    })
                                ]
                            }),
                            new Paragraph(''),
                            new Paragraph(names[0]),
                            new Paragraph(names.length > 1 ? names[1] : ''),
                            new Paragraph(names.length > 2 ? names[2] : ''),
                            new Paragraph(names.length > 3 ? names[3] : ''),
                            new Paragraph(names.length > 4 ? names[4] : ''),
                            new Paragraph(names.length > 5 ? names[5] : ''),
                            new Paragraph(names.length > 6 ? names[6] : '')
                        ],
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE }
                        }
                    }
                    )
                ]
            })
               // Add more TableRow objects for more rows in your inner table
        ]
    });
    }
}

// here we have reached limitations and want to move to a new library react print to pdf
public createEissenhowerMatrix (eissenhowerValues: TodoType[]): Table {

    // const hasPriority = (todo: TodoType): boolean => todo.priority !== 0;
    const UrgentAndImportantTaskNames = eissenhowerValues.filter((item) => item.priority === 1).map(item => item.name);
    const UrgentNotImportantTaskNames = eissenhowerValues.filter((item) => item.priority === 2).map(item => item.name);
    const NotUrgentAndImportantTaskNames = eissenhowerValues.filter((item) => item.priority === 3).map(item => item.name);
    const NoturgentNotImportantTaskNames = eissenhowerValues.filter((item) => item.priority === 4).map(item => item.name);

    const UrgentAndImportantTableContent = this.createEissenhowerSectionContent(UrgentAndImportantTaskNames, 'URGENT AND IMPORTANT:');
    const UrgentNotImportantTableContent = this.createEissenhowerSectionContent(UrgentNotImportantTaskNames, 'URGENT NOT IMPORTANT:');
    const NotUrgentAndImportantTableContent = this.createEissenhowerSectionContent(NotUrgentAndImportantTaskNames, 'NOT URGENT AND IMPORTANT:');
    const NotUrgentNotImportantTableContent = this.createEissenhowerSectionContent(NoturgentNotImportantTaskNames, 'NOT URGENT NOT IMPORTANT:');

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
                      children: [UrgentAndImportantTableContent]
                    }),
                    new TableCell({
                        children: [UrgentNotImportantTableContent]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [NotUrgentAndImportantTableContent]
                      }),
                      new TableCell({
                          children: [NotUrgentNotImportantTableContent]
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
            })
    ]
  });
}

}
