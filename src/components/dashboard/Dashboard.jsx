/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getSignData, getTopUsers } from "../../redux/actions/signdataaction";
import ChartComp from "./Chart/ChartComp";



import { quote } from "../../data/quotes";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
 
  const navigate = useNavigate();

  const { loading: authLoader ,accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authLoader && !accessToken) {
      navigate("/");
    }
    dispatch(getSignData());
    dispatch(getTopUsers());
  }, [accessToken, authLoader, navigate,dispatch]);

  useEffect(() => {
    dispatch(getSignData());
    dispatch(getTopUsers());
  }, [dispatch]);

  const { signDataList, loading } = useSelector((state) => state.signData);

  const { topUsers } = useSelector((state) => state.topUsers);

  //create a new object array which contains only signs performed array
  const list = signDataList
    .map((data) => data.signsPerformed)
    .reduce((acc, val) => acc.concat(val), []);

  //add the counts of same sign values
  const newData = [];
  for (let i = 0; i < list.length; i++) {
    const foundIndex = newData.findIndex(
      (d) => d.SignDetected === list[i].SignDetected
    );
    if (foundIndex === -1) {
      newData.push({ ...list[i] });
    } else {
      newData[foundIndex].count += list[i].count;
    }
  }

  const TopFiveSignsObject = newData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="signlang_dashboard-container">
      {!(loading || authLoader) ? (
        signDataList.length > 0 ? (
          <>
            <div className="signlang_header-data">
              <ChartComp signDataList={signDataList} />

              <div className="signlang_leader-board">
                <h2 className="gradient__text title">Our Top Users</h2>
                <div className="signlang_toprank-box">
                  {topUsers.map((user, index) => (
                    <div className="signlang_tank-row" key={index * 786}>
                      <h2 className="gradient__text">{user.rank}</h2>
                      <h3>{user.username}</h3>
                 
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="signlang_dashboard-midsection">
              <div className="signlang_sign-table">
                <h2 className="gradient__text">Your Most Practiced Signs</h2>

                <table>
                  <tr>
                    <th className="table-heading">Sr.No</th>
                    <th className="table-heading">Signs</th>
                    <th className="table-heading">Frequency</th>
                  </tr>

                  {TopFiveSignsObject.map((data, i) => (
                    <tr key={i * 111} className="sign-row">
                      <td>{i + 1}</td>
                      <td>{data.SignDetected}</td>
                      <td>{data.count} times</td>
                    </tr>
                  ))}
                </table>
              </div>

              <div className="signlang_quotes-box">
                <h2 className="gradient__text">Quote of the Day</h2>
                <div>
                  <blockquote>{quote.quote}</blockquote>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="signlang__nodata-cont">
        
            <h3 className="gradient__text">
              No Data to Display please go back to Detect to Mark Your Learning
            </h3>
          </div>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Dashboard;
