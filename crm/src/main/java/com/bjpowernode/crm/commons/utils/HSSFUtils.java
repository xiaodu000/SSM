package com.bjpowernode.crm.commons.utils;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.CellType;

public class HSSFUtils {



    public static String getCellValueForStr(HSSFCell cell){
        String value="";
        if(cell==null||cell.equals(null)||cell.getCellType()== CellType.BLANK){
            value="null";
        }else {
            //判断数据类型
            switch (cell.getCellType()) {
                case FORMULA:value = "" + cell.getCellFormula();
                    break;
                case NUMERIC:value = "" + cell.getNumericCellValue();
                    break;
                case STRING:value = cell.getStringCellValue();
                    break;
                case BOOLEAN:value = "" + cell.getBooleanCellValue();
                default:
                    break;
            }
        }
        return value;
    }
}
