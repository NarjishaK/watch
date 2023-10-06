import React from "react";
import Navbar from './components/navbar';
import Footer from './components/footer'

function invoice() {
  return (
    <>
    <Navbar/>
    <div className="container">
      <table
        width={600}
        border={0}
        cellPadding={0}
        cellSpacing={0}
        align="center"
        className="fullTable"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <tbody>
          <tr className="hiddenMobile">
            <td height={1} />
          </tr>
          <table
            width={480}
            border={0}
            cellPadding={0}
            cellSpacing={0}
            align="center"
            className="fullPadding"
          >
            <tbody>
              <tr>
                <table
                  width={220}
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  align="left"
                  className="col"
                >
                  <tbody>
                    <tr>
                      <td align="left">
                        {" "}
                        <img
                          src="http://www.supah.it/dribbble/017/logo.png"
                          width={32}
                          height={32}
                          alt="logo"
                          border={0}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: 12,
                          color: "#5b5b5b",
                          fontFamily: '"Open Sans", sans-serif',
                          lineHeight: 2,
                          verticalAlign: "top",
                          textAlign: "left",
                        }}
                      >
                        Hello, Philip Brooks.
                        <br /> Thank you for shopping from our store and for your order.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: 21,
                          color: "#ff0000",
                          letterSpacing: "-1px",
                          fontFamily: '"Open Sans", sans-serif',
                          lineHeight: 1,
                          verticalAlign: "top",
                          textAlign: "right",
                        }}
                      >
                        Invoice
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: 12,
                          color: "#5b5b5b",
                          fontFamily: '"Open Sans", sans-serif',
                          lineHeight: 3,
                          verticalAlign: "top",
                          textAlign: "right",
                        }}
                      >
                        <small>ORDER</small> #800000025
                        <br />
                        <small>MARCH 4TH 2016</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </tr>
            </tbody>
          </table>
        </tbody>
      </table>
      <table
        width="100%"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        align="center"
        className="fullTable"
      >
        <table
          width={600}
          border={0}
          cellPadding={0}
          cellSpacing={0}
          align="center"
          className="fullTable"
        >
          <tbody>
            <tr className="visibleMobile"></tr>
            <td>
              <table
                width={480}
                border={0}
                cellPadding={0}
                cellSpacing={0}
                align="center"
                className="fullPadding"
              >
                <tr>
                  <th
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#5b5b5b",
                      fontWeight: "normal",
                      lineHeight: 1,
                      verticalAlign: "top",
                      padding: "0 10px 7px 0",
                    }}
                    width="52%"
                    align="left"
                  >
                    Item
                  </th>
                  <th
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#5b5b5b",
                      fontWeight: "normal",
                      lineHeight: 1,
                      verticalAlign: "top",
                      padding: "0 0 7px",
                    }}
                    align="left"
                  >
                    <small>SKU</small>
                  </th>
                  <th
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#5b5b5b",
                      fontWeight: "normal",
                      lineHeight: 1,
                      verticalAlign: "top",
                      padding: "0 0 7px",
                    }}
                    align="center"
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#1e2b33",
                      fontWeight: "normal",
                      lineHeight: 1,
                      verticalAlign: "top",
                      padding: "0 0 7px",
                    }}
                    align="right"
                  >
                    Subtotal
                  </th>
                </tr>
                <tr>
                  <td height={1} style={{ background: "#bebebe" }} colSpan={4} />
                </tr>
                <tr>
                  <td height={10} colSpan={4} />
                </tr>
                <tr>
                  <td
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#ff0000",
                      lineHeight: 2,
                      verticalAlign: "top",
                      padding: "10px 0",
                    }}
                    className="article"
                  >
                    Beats Studio Over-Ear Headphones
                  </td>
                  <td
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#646a6e",
                      lineHeight: 2,
                      verticalAlign: "top",
                      padding: "10px 0",
                    }}
                  >
                    <small>MH792AM/A</small>
                  </td>
                  <td
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#646a6e",
                      lineHeight: 2,
                      verticalAlign: "top",
                      padding: "10px 0",
                    }}
                    align="center"
                  >
                    1
                  </td>
                  <td
                    style={{
                      fontSize: 12,
                      fontFamily: '"Open Sans", sans-serif',
                      color: "#1e2b33",
                      lineHeight: 2,
                      verticalAlign: "top",
                      padding: "10px 0",
                    }}
                    align="right"
                  >
                    $299.95
                  </td>
                </tr>
                <td
                  style={{
                    fontSize: 12,
                    fontFamily: '"Open Sans", sans-serif',
                    color: "#ff0000",
                    lineHeight: 2,
                    verticalAlign: "top",
                    padding: "10px 0",
                  }}
                  className="article"
                >
                  Beats RemoteTalk Cable
                </td>
                <td
                  style={{
                    fontSize: 12,
                    fontFamily: '"Open Sans", sans-serif',
                    color: "#646a6e",
                    lineHeight: 2,
                    verticalAlign: "top",
                    padding: "10px 0",
                  }}
                >
                  <small>MH792AM/A</small>
                </td>
                <td
                  style={{
                    fontSize: 12,
                    fontFamily: '"Open Sans", sans-serif',
                    color: "#646a6e",
                    lineHeight: 2,
                    verticalAlign: "top",
                    padding: "10px 0",
                  }}
                  align="center"
                >
                  1
                </td>
                <td
                  style={{
                    fontSize: 12,
                    fontFamily: '"Open Sans", sans-serif',
                    color: "#1e2b33",
                    lineHeight: 2,
                    verticalAlign: "top",
                    padding: "10px 0",
                  }}
                  align="right"
                >
                  $299.95
                </td>
              </table>
            </td>
          </tbody>
        </table>
      </table>
      <table
        width="100%"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        align="center"
        className="fullTable"
      >
        <tbody>
          <tr>
            <table
              width={600}
              border={0}
              cellPadding={0}
              cellSpacing={0}
              align="center"
              className="fullTable"
            >
              <tbody>
                <tr>
                  <table
                    width={480}
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    align="center"
                    className="fullPadding"
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#646a6e",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                          }}
                        >
                          Subtotal
                        </td>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#646a6e",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}
                          width={80}
                        >
                          $329.90
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#646a6e",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                          }}
                        >
                          Shipping &amp; Handling
                        </td>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#646a6e",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                          }}
                        >
                          $15.00
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#000",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                          }}
                        >
                          <strong>Grand Total (Incl.Tax)</strong>
                        </td>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#000",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                          }}
                        >
                          <strong>$344.90</strong>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#b0b0b0",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                          }}
                        >
                          <small>TAX</small>
                        </td>
                        <td
                          style={{
                            fontSize: 12,
                            fontFamily: '"Open Sans", sans-serif',
                            color: "#b0b0b0",
                            lineHeight: 2,
                            verticalAlign: "top",
                            textAlign: "right",
                          }}
                        >
                          <small>$72.40</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* /Table Total */}
                </tr>
              </tbody>
            </table>
          </tr>
        </tbody>
      </table>

      <div className="container">
        <table
          width="100%"
          border={0}
          cellPadding={0}
          cellSpacing={0}
          align="center"
          className="fullTable"
        >
          <tbody></tbody>
        </table>
        <table
          width="100%"
          border={0}
          cellPadding={0}
          cellSpacing={0}
          align="center"
          className="fullTable"
        >
          <tbody>
            <tr>
              <td>
                <table
                  width={480}
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  align="center"
                  className="fullPadding"
                  style={{ backgroundColor: "#e4e0e063" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          fontSize: 11,
                          fontFamily: '"Open Sans", sans-serif',
                          color: "#5b5b5b",
                          lineHeight: 1,
                          verticalAlign: "top",
                        }}
                      >
                        <strong>BILLING INFORMATION</strong>
                      </td>
                      <td
                        style={{
                          fontSize: 11,
                          fontFamily: '"Open Sans", sans-serif',
                          color: "#5b5b5b",
                          lineHeight: 1,
                          verticalAlign: "top",
                        }}
                      >
                        <strong>SHIPPING INFORMATION</strong>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: 12,
                          fontFamily: '"Open Sans", sans-serif',
                          color: "#5b5b5b",
                          lineHeight: 2,
                          verticalAlign: "top",
                        }}
                      >
                        Philip Brooks
                        <br /> Public Wales, Somewhere
                        <br /> New York NY
                        <br /> 4468, United States
                        <br /> T: 202-555-0133
                      </td>
                      <td
                        style={{
                          fontSize: 12,
                          fontFamily: '"Open Sans", sans-serif',
                          color: "#5b5b5b",
                          lineHeight: 2,
                          verticalAlign: "top",
                        }}
                      >
                        Sup Inc
                        <br /> Another Place, Somewhere
                        <br /> New York NY
                        <br /> 4468, United States
                        <br /> T: 202-555-0171
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          width="100%"
          border={0}
          cellPadding={0}
          cellSpacing={0}
          align="center"
          className="fullTable"
        >
          <tbody>
            <tr>
                <table
                  width={480}
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  align="center"
                  className="fullPadding"
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          fontSize: 12,
                          color: "#5b5b5b",
                          fontFamily: '"Open Sans", sans-serif',
                          lineHeight: 2,
                          verticalAlign: "top",
                          textAlign: "left",
                        }}
                      >
                        Have a nice day.
                      </td>
                    </tr>
                  </tbody>
                </table>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default invoice;
