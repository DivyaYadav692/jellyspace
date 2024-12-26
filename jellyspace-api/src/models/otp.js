module.exports = (sequelize, DataTypes) => {
    const OTP = sequelize.define('OTP', {
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // Default status can be "inactive" or similar
            validate: {
                isIn: [[0, 1,]] // For example, 0 could mean inactive, 1 could mean active
            }
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validate email format
                notEmpty: true
            }
        },
        OTP: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true, // Ensure it's an integer
                len: [4, 6] // OTP should be between 4 and 6 digits
            }
        },
        success: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default value can be false
            allowNull: false
        }
    }, {
        timestamps: true, // Add createdAt and updatedAt
        paranoid: true, // Enable soft deletes if you need to track deleted OTPs
        tableName: 'otps'
    });
  
    return OTP;
  };